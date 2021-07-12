import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import OtpInputs from "react-native-otp-inputs";
import { Button, Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { AuthContainer, FormError, ProgressBar } from "../../components";
import { View, Text } from "../../components/Themed";
import { colors } from "../../constants/Colors";
import { RootStoreType } from "../../redux/rootReducer";
import {
  startVerification,
  resetRegError,
  startResendOTP,
  resetRegistered,
} from "../../redux/slices/authSlice";

const VerifyScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [verificationCode, setVerificationCode] = useState("");

  //redux
  const { user, verifying, regError, otp_resend_time, resendingOTP } =
    useSelector((state: RootStoreType) => ({
      user: state.authReducer.user,
      verifying: state.authReducer.verifying,
      regError: state.authReducer.regError,
      otp_resend_time: state.authReducer.otp_resend_time,
      resendingOTP: state.authReducer.resendingOTP,
    }));

  const [resendTime, setResendTime] = useState<number>(otp_resend_time);

  useEffect(() => {
    setResendTime(otp_resend_time);
  }, [otp_resend_time]);

  //timer that counts the OTP expiration time
  useEffect(() => {
    const timerId = setInterval(() => {
      if (resendTime <= 0) {
        clearInterval(timerId);
      } else {
        setResendTime(resendTime - 1);
      }
    }, 1000);

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [resendTime]);

  useEffect(() => {
    return () => {
      dispatch(resetRegError(null));
      dispatch(resetRegistered(null));
    };
  }, []);

  const handleSubmit = () => {
    dispatch(
      startVerification({
        phone_number: user && user.phone_number,
        password: user && user.password,
        security_code: verificationCode,
        session_token: user && user.session_token,
      })
    );
  };

  const handleOnReset = () => {
    dispatch(
      startResendOTP({
        phone_number: user && user.phone_number,
        password: user && user.password,
        session_token: user && user.session_token,
      })
    );
  };

  return (
    <AuthContainer
      showLogo={true}
      title={"Verification"}
      titleAlignCenter={true}
    >
      <Text style={styles.message}>
        Please type the verification code sent to
      </Text>
      {user && <Text style={styles.phone}>{user.phone_number}</Text>}

      <View style={styles.otpWrapper}>
        <OtpInputs
          handleChange={(code) => {
            setVerificationCode(code);
          }}
          numberOfInputs={6}
          keyboardType="phone-pad"
          autofillFromClipboard={false}
          clearTextOnFocus={true}
          selectTextOnFocus={false}
          autofillListenerIntervalMS={8000}
          inputContainerStyles={styles.otpInputContainer}
          inputStyles={styles.otpInput}
        />
      </View>

      <Button
        title="Verify"
        buttonStyle={{
          backgroundColor: colors.red800,
          paddingVertical: 12,
        }}
        titleStyle={{ fontSize: 16, fontWeight: "600" }}
        containerStyle={{ marginTop: 10, marginBottom: 20 }}
        loading={verifying}
        onPress={() => {
          if (!verifying) handleSubmit();
        }}
        disabled={verificationCode.length !== 6}
      />

      {regError && typeof regError == "string" && (
        <FormError error={regError} />
      )}

      <Divider style={{ backgroundColor: colors.black700, marginTop: 20 }} />

      {resendTime > 0 ? (
        <View style={styles.resendTextWrapper}>
          <Text style={styles.resendWhiteText}>Resend in {resendTime}</Text>
        </View>
      ) : resendingOTP ? (
        <View style={styles.resendTextWrapper}>
          <ProgressBar />
        </View>
      ) : (
        <View style={styles.resendTextWrapper}>
          <Text style={styles.resendWhiteText}>
            Didn't receive the verification code?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (!resendingOTP) handleOnReset();
            }}
          >
            <Text style={styles.resendRedText}>Resend again</Text>
          </TouchableOpacity>
        </View>
      )}
    </AuthContainer>
  );
};

export default VerifyScreen;

const styles = StyleSheet.create({
  message: {
    fontSize: 16,
    marginTop: 20,
    alignSelf: "center",
  },
  phone: {
    fontSize: 18,
    marginTop: 8,
    fontWeight: "bold",
    alignSelf: "center",
  },
  otpWrapper: {
    backgroundColor: colors.black600,
    marginHorizontal: 20,
    marginVertical: 25,
  },
  otpInputContainer: {
    flex: 1,
    alignItems: "stretch",
    marginHorizontal: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  otpInput: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: colors.red800,
    color: colors.red300,
    fontSize: 30,
    fontWeight: "bold",
    borderWidth: 1.5,
    textAlign: "center",
  },
  resendTextWrapper: {
    marginVertical: 20,
    backgroundColor: colors.black600,
    flexDirection: "row",
    justifyContent: "center",
  },
  resendRedText: {
    color: colors.red400,
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "bold",
  },
  resendWhiteText: {
    color: colors.red300,
    fontSize: 14,
    alignSelf: "center",
  },
});
