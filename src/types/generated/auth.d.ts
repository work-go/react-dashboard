// Type for GoogleCallbackSearchSchema
type GoogleCallbackSearch = {
    code: string;
    state: string;
};

// Type for LoginSchema
type Login = {
    email: string;
    password: string;
};

// Type for RegisterSchema
type Register = {
    email: string;
    password: string;
    passwordConfirm: string;
};