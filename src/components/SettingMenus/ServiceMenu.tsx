import {useState} from "react";
import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import ServiceCreate from "./Bulk/ServiceCreate";
import {ServiceMaterialTable} from "../MaterialTables/ServiceMaterialTable";


function getSteps() {
    return ['Regular View', 'Quick Create'];
}




export default function ServiceMenu() {
    const [activeStep, setActiveStep] = useState<number>(0);
    const steps = getSteps();
    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };
    return (
        <Box height="100%" width="100%" >
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepButton onClick={handleStep(index)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <div>
                {
                    activeStep === 0 &&
                    <ServiceMaterialTable />
                }
                {
                    activeStep === 1 &&
                    <ServiceCreate />
                }
            </div>
        </Box>
    );
}