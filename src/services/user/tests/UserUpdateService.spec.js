const UserRepositoryMemory = require("../../../repositories/user/memory/UserRepositoryMemory")
const UserCreateService = require("../UserCreateService");
const AppError = require("../../../utils/AppError");
const UserUpdateService = require("../UserUpdateService");




describe("UserService - Update", () => {

    let userRepositoryMemory = null;
    let userUpdateService = null;
    let userCreateService = null;

    beforeEach(() => {
        userRepositoryMemory = new UserRepositoryMemory();
        userCreateService = new UserCreateService(userRepositoryMemory)
        userUpdateService = new UserUpdateService(userRepositoryMemory)

    })

    it("User must be succesfuly update", async () => {
        const user = {
            name: "User Testee",
            email: "user@test.com",
            password: "123",
        }


        const userCreated = await userCreateService.execute(user);

        const updatedInfos = {
            user_id: userCreated.id,
            name: "Enzo Rodrigues",
            email: "novo@email.commm",
            password: "123",
            newPassword: "212",
        }

        const success = await userUpdateService.execute(updatedInfos);

        expect(success).toEqual(true);



    });

    it("User must not be succesfuly update when the new email already belongs to another user", async () => {
        const user = {
            name: "User Testee",
            email: "user@test.com",
            password: "123",
        }


        const userCreated = await userCreateService.execute(user);

        const updatedInfos = {
            user_id: userCreated.id,
            name: "Enzo Rodrigues",
            email: "user@test.com",
            password: "123",
            newPassword: "212",
        }


        await expect(userUpdateService.execute(updatedInfos)).rejects.toEqual(new AppError("The email address is already associated with another account!"));



    });


});


