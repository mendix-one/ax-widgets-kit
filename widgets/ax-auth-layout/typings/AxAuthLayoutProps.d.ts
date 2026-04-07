/**
 * This file was generated from AxAuthLayout.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { DynamicValue } from "mendix";

export interface AxAuthLayoutContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    content?: ReactNode;
    tagline?: DynamicValue<string>;
    brandDescription?: DynamicValue<string>;
    themeTokens: string;
    showBackground: boolean;
}

export interface AxAuthLayoutPreviewProps {
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
    content: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    tagline: string;
    brandDescription: string;
    themeTokens: string;
    showBackground: boolean;
}
