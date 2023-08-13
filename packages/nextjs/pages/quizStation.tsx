import { useState } from "react";
import Quiz from "@/components/Quiz";
import Tutorial from "@/components/Tutorial";
import Verify1 from "@/components/Verify1";
import Verify2 from "@/components/Verify2";
import Verify3 from "@/components/Verify3";

function getSteps() {
  return [
    <b key="1">{`Enter Personal Details`}</b>,
    <b key="2">{`Enter Education Details`}</b>,
    <b key="3">{`Enter Address`}</b>,
    <b key="3">{`Enter Address 44444`}</b>,
    <b key="3">{`Enter Address 5555`}</b>,
  ];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <Tutorial />;
    case 1:
      return <Quiz />;
    case 2:
      return <Verify1 />;
    case 3:
      return <Verify2 />;
    case 4:
      return <Verify3 />;
    default:
      return "Unknown step";
  }
}

export default function QuizStation() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <>
      {steps.map((label, index) => (
        <div key={index}>
          {activeStep === index ? (
            <>
              <div>{label}</div>
              <div>{getStepContent(index)}</div>
              <div>
                <>
                  <button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                  </button>
                  <button onClick={handleNext}>{activeStep === steps.length - 1 ? "Finish" : "Next"}</button>
                </>
              </div>
            </>
          ) : null}
        </div>
      ))}
    </>
  );
}
