import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import { SECRET_KEY } from '../../config/config.js';
import {UserInputError} from 'apollo-server';
import { validateRegisterInput, validateLoginInput } from '../../util/validators.js';

const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, SECRET_KEY, { expiresIn: '1h'});
}

export const userResolvers = {
    Mutation: {
        async register(_, {registerInput: { username, email, password, confirmPassword }}){
            // TODO Validate user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            if(!valid){
                throw new UserInputError("Error", { errors });
            }
            const user = await User.findOne({username});
            if(user){
                throw new UserInputError('username is taken!', {
                    errors: {
                        username: "This username is taken"
                    }
                })
            }
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token 
            };
        },

        async login(_, { username, password }) {
            const { valid, errors } = validateLoginInput(username, password);
            const user = await User.findOne({username});
            if(!valid){
                throw new UserInputError("Error", { errors });
            }
            
            if(!user){
                errors.general = 'User not found';
                throw new UserInputError('User not found', {errors});
            }

            const match = await bcrypt.compare(password, user.password);
            if(!match){
                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong credentials', {errors});
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token 
            };
        }
    }
}