/**
 * This file was generated from AxAgentChat.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue } from "mendix";

export interface AxAgentChatContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    title?: DynamicValue<string>;
    welcomeMessage?: DynamicValue<string>;
    onSendMessage?: ActionValue;
}

export interface AxAgentChatPreviewProps {
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
    title: string;
    welcomeMessage: string;
    onSendMessage: {} | null;
}
