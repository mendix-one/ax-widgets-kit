/**
 * This file was generated from AxWebApp.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";

export interface AxWebAppContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    logo?: ReactNode;
    tasksMenu?: ReactNode;
    notifyMenu?: ReactNode;
    userMenu?: ReactNode;
    sidebar?: ReactNode;
    content?: ReactNode;
    themeTokens: string;
    agentChat?: ReactNode;
}

export interface AxWebAppPreviewProps {
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
    logo: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    tasksMenu: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    notifyMenu: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    userMenu: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    sidebar: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    content: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    themeTokens: string;
    agentChat: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
}
