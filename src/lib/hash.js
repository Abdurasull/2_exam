import bcrypt from "bcrypt";

export const HashingService = {
    hashingPassword: async (password) => {
        return await bcrypt.hash(password, 10);
    },
    comparePassword: async (password, hashPassword) => {
        return await bcrypt.compare(password,  hashPassword);
    }
}