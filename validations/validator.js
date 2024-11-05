 const Otps = new Set();
 const VerificationIds = new Set();


const deleteOtp = (email) => {
    Otps.forEach((data) => {
      if (data?.email === email) {
        Otps.delete(data);
      }
    });
  };
  const addOtp = async (otp, email) => {
    await deleteOtp(email);
    Otps.add({ email: email, otp: otp });
    console.log(Otps, "Otps");
    setTimeout(() => deleteOtp(email), 1000 * 60 * 10); // Token valid for 10 minutes
  };
  
  const deleteVerificationId = (email) => {
    VerificationIds.forEach((data) => {
      if (data?.email === email) {
        VerificationIds.delete(data);
      }
    });
  };

  const addVerificationId = async (verifyId, email) => {
    await deleteVerificationId(email);
    VerificationIds.add({ email: email, verifyId: verifyId });
    console.log(VerificationIds, "VerificationIds");
    setTimeout(() => deleteVerificationId(email), 1000 * 60 * 1); // verifyId valid for 1 minutes
  };

  const isValidOTP = async(email,otp) => {
    let valid = false;
    await Otps.forEach((data) => {
      if (data?.email === email) {
        if (data?.otp === otp) {
          valid = true;
          Otps.delete(data);
        }
      }
    });
    return valid
  }

  const isValidVerificationId = async(email,verificationId) => {
    let valid = false;
    await VerificationIds.forEach((data) => {
      if (data?.email === email) {
        if (data?.verifyId === verificationId) {
          valid = true;
          VerificationIds.delete(data);
        }
      }
    });
    return valid
  } 

  export {
    addOtp,
    addVerificationId,
    deleteOtp,
    deleteVerificationId,
    isValidOTP,
    isValidVerificationId
  }