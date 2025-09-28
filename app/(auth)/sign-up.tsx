import { ClientFormSchemaSignUp } from "@/schemas/client/client-schema";
import { router, useRouter } from "expo-router";
import { useState } from "react";
import {
  Input,
  NextButton,
  SignPage,
  SignPageContent,
  SignPageFooter,
  SignPageHeader,
  SignPageItems,
} from "../components/(auth)/sign-page";
import {
  ErrorSchemaType,
  SuccessSchema,
  SuccessSchemaType,
} from "@/schemas/standar-response-schema";
import safeFetch from "../utils/safe-fetch";
import { VerifyUserExistsResponseSchema } from "@/schemas/user/user-schema";
import { LOCAL_IP } from "@/config/api";
import { authClient } from "@/lib/auth-client";
import Toast from "react-native-toast-message";

const SignIn = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string | undefined>(undefined);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | undefined
  >(undefined);

  async function verifySubmit(): Promise<boolean> {
    const result = ClientFormSchemaSignUp.safeParse({
      name: name,
      email: email?.toLowerCase(),
      password: password,
    });
    if (!result.success) {
      result.error.issues.forEach(issue => {
        if (issue.path.includes("name")) {
          setNameError(issue.message);
        } else if (issue.path.includes("email")) {
          setEmailError(issue.message);
        } else if (issue.path.includes("password")) {
          setPasswordError(issue.message);
        }
      });
      return false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }

    const resVerify = await verifyMailAvailability(email);
    if (resVerify.error) {
      setEmailError("User with this email already exists");
      return false;
    }

    return true;
  }

  let isDisabled = !email || !password || !name || !confirmPassword;

  // async function handleSubmit() {
  //   router.push({
  //     pathname: "/code-verification",
  //     params: {
  //       name,
  //       email,
  //       dateBirth: date?.toISOString(),
  //     },
  //   });

  //   console.log("Sending code verification to email:", emailValue);

  //   const resPost = await postCodeVerification({ email: emailValue });
  //   if (resPost.error) {
  //     setEmailError(resPost.details);
  //   }
  // }

  return (
    <SignPage>
      <SignPageContent>
        <SignPageHeader backButton>Create account</SignPageHeader>
        <SignPageItems>
          <Input
            placeholder="Name"
            value={name}
            onChange={text => {
              setNameError(undefined);
              setName(text);
            }}
            type="default"
            error={nameError}
          />
          <Input
            type="email-address"
            placeholder="Email"
            value={email}
            onChange={text => {
              setEmailError(undefined);
              setEmail(text.toLowerCase());
            }}
            error={emailError}
          />
          <Input
            placeholder="Password"
            value={password}
            onChange={text => {
              setPasswordError(undefined);
              setPassword(text);
            }}
            error={passwordError}
            isPassword={true}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
          <Input
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={text => {
              setConfirmPasswordError(undefined);
              setConfirmPassword(text);
            }}
            error={confirmPasswordError}
            isPassword={true}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
        </SignPageItems>
      </SignPageContent>
      <SignPageFooter>
        <NextButton
          onPress={async () => {
            setIsLoading(true);
            const isValid = await verifySubmit();
            if (!isValid) {
              setIsLoading(false);
              return;
            }
            await handleSubmitSignUp(name, email, password);
            setIsLoading(false);
          }}
          isLoading={isLoading}
          isDisabled={isDisabled}
        />
      </SignPageFooter>
    </SignPage>
  );
};

export default SignIn;

async function verifyMailAvailability(
  email: string
): Promise<SuccessSchemaType | ErrorSchemaType> {
  try {
    const { data } = await safeFetch({
      url: `http://${LOCAL_IP}:3000/user/verify`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (data.error) {
      throw new Error(data.details || "Unexpected error");
    }
    VerifyUserExistsResponseSchema.parse(data);
    if (data.exists) {
      throw new Error("Email is already registered");
    } else {
      return {
        error: false,
      };
    }
  } catch (error: unknown) {
    return {
      error: true,
      details: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}

async function postCodeVerification({
  email,
}: {
  email: string;
}): Promise<SuccessSchemaType | ErrorSchemaType> {
  try {
    const { data } = await safeFetch({
      url: `http://${LOCAL_IP}:3000/code-verification`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (data.error) {
      throw new Error(data.details);
    }
    SuccessSchema.parse(data);
    return {
      error: false,
    };
  } catch (error) {
    return {
      error: true,
      details: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}

export async function handleSubmitSignUp(
  userName: string,
  email: string,
  password: string
) {
  const res = await authClient.signUp.email({
    name: userName,
    email: email,
    password: password,
    userType: "client",
  });
  if (res.error) {
    console.log("Sign up error", res.error.message);
    Toast.show({
      type: "error",
      text1: res.error.message,
    });
    router.replace("/sign-in");
    return;
  }

  const resPost = await postCodeVerification({ email: email });
  if (resPost.error) {
    Toast.show({
      type: "error",
      text1: "Error sending code verification",
    });
    router.replace("/sign-in");
    return;
  }

  console.log("Sign up successful");
  router.replace("/code-verification");
}
