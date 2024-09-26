function calculateTimeBasedEfficiency(usersTimeSpentOnEachField) {
    const R = usersTimeSpentOnEachField.length; // Number of users
    const N = 12; // Number of fields
    
    let totalEfficiency = 0;
  
    // Iterate over each user (j from 1 to R)
    usersTimeSpentOnEachField.forEach(user => {
      // Sum the efficiency for each field (i from 1 to N)
      let userEfficiency = 0;
      for (let key in user) {
        if (user[key] > 0) { // Skip or handle fields with 0 time
          userEfficiency += 1 / user[key]; // n_ij = 1 (as per formula, numerator is always 1)
        }
      }
      totalEfficiency += userEfficiency;
    });
  
    // Time Based Efficiency = sum of (1 / t_ij) / (N * R)
    return totalEfficiency / (N * R);
  }
  
  // Data from your three users (as per previous object)
  const usersTimeSpentOnEachField = [
    {
      address: 9.163,
      city: 3.903,
      cnic: 3.849,
      contactNumber: 3.703,
      email: 7.831,
      fatherName: 5.556,
      firstName: 2.538,
      fscObtainedMarks: 1.981,
      fscTotalMarks: 2.515,
      lastName: 1.822,
      ntsObtainedMarks: 2.049,
      ntsTotalMarks: 3.696,
      program: 0
    },
    {
      address: 2.773,
      city: 3.222,
      cnic: 4.579,
      contactNumber: 4.474,
      email: 7.541,
      fatherName: 3.139,
      firstName: 1.332,
      fscObtainedMarks: 2.073,
      fscTotalMarks: 1.392,
      lastName: 2.78,
      ntsObtainedMarks: 0.876,
      ntsTotalMarks: 2.828,
      program: 0
    },
    {
      address: 3.736,
      city: 4.434,
      cnic: 8.137,
      contactNumber: 7.824,
      email: 8.328,
      fatherName: 4.69,
      firstName: 3.258,
      fscObtainedMarks: 3.712,
      fscTotalMarks: 1.876,
      lastName: 2.868,
      ntsObtainedMarks: 2.552,
      ntsTotalMarks: 5.737,
      program: 0
    }
  ];
  
  console.log("Time Based Efficiency:", calculateTimeBasedEfficiency(usersTimeSpentOnEachField));
  