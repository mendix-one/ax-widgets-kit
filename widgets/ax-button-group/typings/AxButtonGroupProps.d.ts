/**
 * This file was generated from AxButtonGroup.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";

export type VariantEnum = "contained" | "outlined" | "text";

export type ColorEnum = "primary" | "secondary" | "success" | "warning" | "error" | "info";

export type SizeEnum = "small" | "medium" | "large";

export type OrientationEnum = "horizontal" | "vertical";

export interface AxButtonGroupContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    content?: ReactNode;
    variant: VariantEnum;
    color: ColorEnum;
    size: SizeEnum;
    orientation: OrientationEnum;
    disabled: boolean;
    fullWidth: boolean;
}

export interface AxButtonGroupPreviewProps {
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
    variant: VariantEnum;
    color: ColorEnum;
    size: SizeEnum;
    orientation: OrientationEnum;
    disabled: boolean;
    fullWidth: boolean;
}
