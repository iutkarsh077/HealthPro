export const CalculateSuccessRate = (
    ageRange: string,
    cycles: number,
    previousProcedures: { icsi: string; pgt: string },
    medicalConditions: {
      pcos: boolean;
      endometriosis: boolean;
      lowOvarianReserve: boolean;
      maleFactorInfertility: boolean;
    }
  ): number => {
    let rate = 0;
  
    // Age Range Success Rate
    switch (ageRange) {
      case "Under 30":
        rate += 60;
        break;
      case "Between 30 - 34":
        rate += 50;
        break;
      case "Between 35 - 37":
        rate += 40;
        break;
      case "Between 38 - 40":
        rate += 30;
        break;
      case "Between 41 - 43":
        rate += 20;
        break;
      case "Above 43":
        rate += 10;
        break;
      default:
        break;
    }
  
    // Number of Cycles Success Rate
    if (cycles === 1) rate += 20;
    else if (cycles === 2) rate += 30;
    else if (cycles === 3) rate += 40;
    else if (cycles === 4) rate += 50;
    else if (cycles === 5) rate += 60;
  
    // Add/Subtract for Previous Procedures
    if (previousProcedures.icsi === "yes") rate += 5;
    if (previousProcedures.pgt === "yes") rate += 5;
  
    // Subtract for Medical Conditions
    if (medicalConditions.pcos) rate -= 5;
    if (medicalConditions.endometriosis) rate -= 10;
    if (medicalConditions.lowOvarianReserve) rate -= 15;
    if (medicalConditions.maleFactorInfertility) rate -= 5;
  
    // Ensure success rate is between 0 and 100
    return Math.min(Math.max(rate, 0), 100);
  };
  