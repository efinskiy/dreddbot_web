import {TLoginButton, TLoginButtonSize} from "react-telegram-auth";



export const Login = () => {
    return (
        <div>
            <TLoginButton
                botName="cfdredd_bot"
                buttonSize={TLoginButtonSize.Large}
                lang="ru"
                usePic={true}
                cornerRadius={20}
                onAuthCallback={(user) => {
                    console.log('Hello, user!', user);
                }}
                requestAccess={'write'}
            />
        </div>
    )
}