import React from "react";

interface ProfileProps {
    children: React.ReactNode;
    name: string;
    description?: string;
}

export default function Profile({children, name, description}: ProfileProps): JSX.Element {
    return (
        <a style={{textDecoration: "none"}} href={`/members/${name.replace(/\s/g, "-")}`}>
            {/* TODO: Give clear indication of the card being clickable */}
            <div className="card">
                <div className="cardHeader">
                    {children}
                    <p className="name">{name}</p>
                </div>
                <div className="cardContent">
                    {description?.split("\n").map((descItem) => (
                        <p>{descItem}</p>
                    ))}
                </div>
            </div>
        </a>
    );
}
