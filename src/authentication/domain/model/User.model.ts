export class UserModel {
    public firstname: string;
    public lastname: string;
    public email: string;
    public password: string;
    public avatar?: string;

    public setPassword(password: string): void | Error {
        if (password.length < 8) {
            return new Error("Password is too short");
        }
        if (password.length > 20) {
            return new Error("Password is too long");
        }
        if (!password.match(/[0-9]/)) {
            return new Error("Password must contain at least one number");
        }
        if (!password.match(/[a-z]/)) {
            return new Error("Password must contain at least one lowercase letter");
        }
        if (!password.match(/[A-Z]/)) {
            return new Error("Password must contain at least one uppercase letter");
        }
        this.password = password;
    }

    public setEmail(email: string): void | Error {
        if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
            return new Error("Invalid email address");
        }
        this.email = email;
    }

    public setFirstname(firstname: string): void | Error {
        if (firstname.length < 2) {
            return new Error("Firstname is too short");
        }
        if (firstname.length > 20) {
            return new Error("Firstname is too long");
        }
        this.firstname = firstname;
    }

    public setLastname(lastname: string): void | Error {
        if (lastname.length < 2) {
            return new Error("Lastname is too short");
        }
        if (lastname.length > 30) {
            return new Error("Lastname is too long");
        }
        this.lastname = lastname;
    }

    public setAvatar(avatar: string): void | Error {
        this.avatar = avatar;
    }
}