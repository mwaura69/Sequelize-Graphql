import User from './model.js'

export const resolvers = {
    Query: {
        user(_,{username}) {
            return User.findOne({where: { username: username} })
        },
        users() {
            return User.findAll()
        },
        countries() {
            return User.findAll();
        },
        country(_, {country}) {
            return User.findOne({where: {country: country }})
        }
    },
    Mutation: {
        createUser(_, {name, age, country}) {
            return User.create({username: name, age: age, country: country})
        },
        updateUser(_, {id, username, age, country}) {
            return User.update({age: age, country: country, username: username}, {
                where: {
                    id: id,
                }
            })
        },
        deleteUser(_,{id}) {
            return User.destroy({
                where: {
                    id: id
                }
            })
        }
    }
}