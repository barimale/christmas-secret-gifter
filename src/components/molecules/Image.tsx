import sizeMe from 'react-sizeme';
import * as UiImage from 'material-ui-image';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

type ImageProps ={
    aspectRatio?: number;
    src: string;
    style: CSSProperties;
}
function Image(props: ImageProps){
    props.style.height = 'unset';

    return (<UiImage.default
    style={props.style}
    src={props.src}
    aspectRatio={props.aspectRatio}
    disableSpinner/>);
}

export default sizeMe({ monitorHeight: true, monitorWidth: true })(Image);