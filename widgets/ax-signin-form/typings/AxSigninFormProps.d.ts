/**
 * This file was generated from AxSigninForm.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";

export interface AxSigninFormContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    emailAttr?: EditableValue<string>;
    passwordAttr?: EditableValue<string>;
    showSSO: boolean;
    onSubmit?: ActionValue;
    onNavigateSignUp?: ActionValue;
    onNavigateResetPass?: ActionValue;
    onGoogleSSO?: ActionValue;
    onMicrosoftSSO?: ActionValue;
}

export interface AxSigninFormPreviewProps {
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
    emailAttr: string;
    passwordAttr: string;
    showSSO: boolean;
    onSubmit: {} | null;
    onNavigateSignUp: {} | null;
    onNavigateResetPass: {} | null;
    onGoogleSSO: {} | null;
    onMicrosoftSSO: {} | null;
}
