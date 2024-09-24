import React from 'react';
import CardWrapper from "@/components/auth/card-wrapper";

const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel={"Oops! Something went wrong"}
            backButtonHref={"/auth/login"}
            backButtonLabel={"Back to login"}
        >
            <></>
        </CardWrapper>
    );
};

export default ErrorCard;
