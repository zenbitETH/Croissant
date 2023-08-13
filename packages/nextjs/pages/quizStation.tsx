import { useState } from "react";
import Quiz from "@/components/Quiz";
import Tutorial from "@/components/Tutorial";
import Verify1 from "@/components/Verify1";
import Verify2 from "@/components/Verify2";
import Verify3 from "@/components/Verify3";

function getSteps() {
  return [
    <b key="1">{`1. Onboarding Video`}</b>,
    <b key="2">{`2. Q&A`}</b>,
    <b key="3">{`3. Verify Answers`}</b>,
    <b key="4">{`4. Verify WorldID`}</b>,
    <b key="5">{`5. Get Croissant`}</b>,
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
              <div className="fixed top-16 text-2xl font-kum fixed left-1/2 -translate-x-1/2">{label}</div>
              <div>{getStepContent(index)}</div>
              <div>
                <>
                  <button
                    className="homeBT fixed left-5 top-1/2 -translate-y-1/2"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </button>
                  <button className="homeBT fixed right-5 top-1/2 -translate-y-1/2" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </button>
                </>
              </div>
            </>
          ) : null}
        </div>
      ))}
    </>
  );
}
