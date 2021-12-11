export const TopDiv = (props: any) => {
    const backgroundColor: string = props.style !== undefined ? props.style.backgroundColor : 'unset';

    return (
        <div
            {...props}
            style={{
                backgroundColor: backgroundColor,
                justifyContent: 'center',
                height: '100%',
                width: '100%',
                alignItems: 'center'
            }}>
            {props.children}
        </div>
    );
};
