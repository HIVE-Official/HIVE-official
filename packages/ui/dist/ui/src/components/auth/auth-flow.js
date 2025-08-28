"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from '../../lib/utils';
import { SchoolPick, EmailGate, MagicLinkSent } from ".";
export const AuthFlow = ({ schools, onSchoolSelect, onEmailSubmit, onCreateSchool: _onCreateSchool, className, }) => {
    const [currentStep, setCurrentStep] = useState("school-pick");
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [email, setEmail] = useState("");
    const [direction, setDirection] = useState(0);
    const handleSchoolSelect = (school) => {
        setSelectedSchool(school);
        onSchoolSelect(school);
        setDirection(1);
        setCurrentStep("email-gate");
    };
    const handleEmailSubmit = async (email) => {
        setEmail(email);
        await onEmailSubmit(email);
        setDirection(1);
        setCurrentStep("magic-link-sent");
    };
    const handleResendMagicLink = async () => {
        try {
            await onEmailSubmit(email);
            return true;
        }
        catch (error) {
            console.error('Failed to resend magic link:', error);
            return false;
        }
    };
    const handleBack = (step) => {
        setDirection(-1);
        setCurrentStep(step);
    };
    return (_jsx("div", { className: cn("w-full relative overflow-hidden", className), children: _jsxs(AnimatePresence, { initial: false, custom: direction, children: [currentStep === "school-pick" && (_jsx(motion.div, { initial: { opacity: 0, x: direction > 0 ? 1000 : -1000 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: direction < 0 ? 1000 : -1000 }, transition: {
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }, className: "absolute w-full", children: _jsx(SchoolPick, { schools: schools, onSchoolSelect: handleSchoolSelect, className: "bg-transparent" }) }, "school-pick")), currentStep === "email-gate" && selectedSchool && (_jsx(motion.div, { initial: { opacity: 0, x: direction > 0 ? 1000 : -1000 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: direction < 0 ? 1000 : -1000 }, transition: {
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }, className: "absolute w-full", children: _jsx(EmailGate, { schoolName: selectedSchool.name, schoolDomain: selectedSchool.domain, schoolId: selectedSchool.id, onSuccess: handleEmailSubmit, onBack: () => handleBack("school-pick") }) }, "email-gate")), currentStep === "magic-link-sent" && selectedSchool && (_jsx(motion.div, { initial: { opacity: 0, x: direction > 0 ? 1000 : -1000 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: direction < 0 ? 1000 : -1000 }, transition: {
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }, className: "absolute w-full", children: _jsx(MagicLinkSent, { email: email, school: selectedSchool, onBack: () => handleBack("email-gate"), onResend: handleResendMagicLink }) }, "magic-link-sent"))] }) }));
};
//# sourceMappingURL=auth-flow.js.map