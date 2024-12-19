const AppError = require("../../../utils/AppError")

class UserRepositoryMemory {

    constructor() {
        this.users = []
    }


    async findByEmail({ email }) {
        const user = Object.assign({}, this.users.find(user => user.email == email));

        if(!Object.keys(user).length > 0) return null;
        return user;
    }

    async findById(id) {
        const user = Object.assign({}, this.users.find(user => user.id == id));
        if(!Object.keys(user).length > 0) return null;
        return user;
    }

    async create({ name, email, password }) {

        const user = {
            id: Math.floor(Math.random() * 1000) + 1,
            name,
            email,
            password,
        }

        this.users.push(user);

        return user;

    }

    async update(newUser) {
        
        this.users.forEach((user, index) => {
            if (user.id == newUser.id) {
                this.users[index] = newUser;
            }
        })

        return this.users;

         


    }

}

module.exports = UserRepositoryMemory;