const UserRepositoryMemory = require("../../../repositories/user/memory/UserRepositoryMemory")
const UserCreateService = require("../../../services/user/UserCreateService");
const AppError = require("../../../utils/AppError");
const UserUpdateService = require("../UserUpdateService");


describe("UserService - Create", () => {

    let userRepositoryMemory = null;
    let userCreateService = null;
    let userUpdateService = null;

    beforeEach(() => {
        userRepositoryMemory = new UserRepositoryMemory();
        userCreateService = new UserCreateService(userRepositoryMemory);
        userUpdateService = new UserUpdateService(userRepositoryMemory);

    })

    it("User must be create succesufuly", async () => {

        const user = {
            name: "User Test 1",
            email: "user@test.com",
            password: "123",
        }

        const createdUser = await userCreateService.execute(user);

        expect(createdUser).toHaveProperty("id");
    })


    it("User must not be created with an existing email", async () => {
        const user1 = {
            name: "User Test 1",
            email: "user@test.com",
            password: "123",
        }

        const user2 = {
            name: "User Test 2",
            email: "user@test.com",
            password: "123",
        }

        await userCreateService.execute(user1);


        await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("The email is already being used!"))



    })



});


