import React from "react"

export function withSuspense<WCP extends React.ComponentType<any>>(
    WrappedComponent: WCP
) {
    return (props: React.ComponentProps<WCP>) => {
        return (
            <React.Suspense fallback={<div>loading...</div>}>
                <WrappedComponent {...props} />
            </React.Suspense>
        );
    };
}
