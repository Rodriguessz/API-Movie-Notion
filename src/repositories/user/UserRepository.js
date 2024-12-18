const knex = require("../../database/knex");


class UserRepository {

    async findByEmail({id = null, email, exists= false}) {

        let user = null;

        if(!exists){

            user = await knex("users").where({ email }).first();
        }else{
             user = await knex("users").where({ email }).whereNot({id}).first();
        }

        return user;
    }

    async findById(id) {
        const user = await knex("users").where({ id }).first();

        return user;
    }

    async create({ name, email, password }) {

        const [createdUser] = await knex("users").insert({ name, email, password });

        return createdUser;
    }

    async update({id, name, email, password }){
        await knex("users").update({name, email, password}).where({id}) 
    };

}



module.exports = UserRepository;