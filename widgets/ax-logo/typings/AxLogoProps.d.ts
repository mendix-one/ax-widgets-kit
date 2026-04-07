/**
 * This file was generated from AxLogo.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue } from "mendix";

export interface AxLogoContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    logoUrl?: DynamicValue<string>;
    altText?: DynamicValue<string>;
    height: number;
    onClick?: ActionValue;
}

export interface AxLogoPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    logoUrl: string;
    altText: string;
    height: number | null;
    onClick: {} | null;
}
