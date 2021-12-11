const CenteredDiv = (props: any) =>{
    const backgroundColor: string = props.style !== undefined ? props.style.backgroundColor : 'unset';
    const verticalAlign: string = props.style !== undefined ? props.style.verticalAlign : 'center';

    return(
        <div 
            {...props}
                style={{
                    backgroundColor : backgroundColor,
                    display:'flex',
                    justifyContent: 'space-around',
                    verticalAlign: verticalAlign,
                    height: '100%',
                    width: '100%',
                    alignItems:'center'
        }}>
             {props.children}
        </div>
    );
}

export default CenteredDiv;