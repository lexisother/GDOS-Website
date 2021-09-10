import React from "react";

interface ProfileProps {
    children: React.ReactNode;
    name: string;
    description?: string;
}

export default function Profile({children, name, description}: ProfileProps): JSX.Element {
    return (
        <div className="card">
            <div className="cardHeader">
                {children}
                <p className="name">{name}</p>
            </div>
            <div className="cardContent">{description}</div>
        </div>
    );
}
