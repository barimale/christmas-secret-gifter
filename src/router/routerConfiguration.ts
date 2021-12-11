import { Title as MainTitle, Path as MainPath } from '../components/screens/MainScreen';
import { Title as ContactTitle, Path as ContactPath } from "../components/screens/ContactScreen";

export const appBaseRouteKey = "";

export enum configSectionType {
    'divider',
    'link'
}

export type configSection = {
    title: string;
    api: string;
    type: configSectionType;
}

export function GetFullPathTo(title: string): string{
    const result = OrderedSectionsConfiguration.findIndex((p: configSection) => p.title === title);
    return OrderedSectionsConfiguration[result].api;
}

export const OrderedSectionsConfiguration: Array<configSection> = [
    {
        title: MainTitle,
        api: appBaseRouteKey + MainPath,
        type: configSectionType.link
    },
    {
        title: "",
        api: "",
        type: configSectionType.divider
    },
    {
        title: ContactTitle,
        api: appBaseRouteKey + ContactPath,
        type: configSectionType.link
    },
];