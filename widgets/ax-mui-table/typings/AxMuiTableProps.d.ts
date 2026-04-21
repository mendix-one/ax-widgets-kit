/**
 * This file was generated from AxMuiTable.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { DynamicValue, EditableValue, ListValue, ListActionValue, ListAttributeValue, ListExpressionValue, SelectionSingleValue, SelectionMultiValue } from "mendix";
import { Big } from "big.js";

export type PaginationModeEnum = "pagingButtons" | "loadMore" | "none";

export type SelectionMethodEnum = "checkbox" | "radio" | "row";

export type RenderTypeEnum = "attribute" | "dynamicText" | "link";

export type AlignEnum = "left" | "center" | "right";

export interface ColumnsType {
    columnKey: string;
    caption?: DynamicValue<string>;
    groupKey: string;
    groupCaption: string;
    visible: boolean;
    renderType: RenderTypeEnum;
    attributeValue?: ListAttributeValue<Big | boolean | Date | string>;
    dynamicTextValue?: ListExpressionValue<string>;
    linkCaption?: ListExpressionValue<string>;
    linkAction?: ListActionValue;
    allowRowEvents: boolean;
    sortable: boolean;
    align: AlignEnum;
    width: number;
    ellipsis: boolean;
}

export interface DynamicColumnsType {
    columnsSource: ListValue;
    cellsAttribute?: ListAttributeValue<string>;
    columnKey?: ListExpressionValue<string>;
    columnTitle?: ListExpressionValue<string>;
    columnValueKey?: ListExpressionValue<string>;
    columnGroupKey?: ListExpressionValue<string>;
    columnGroupTitle?: ListExpressionValue<string>;
    columnVisible?: ListExpressionValue<boolean>;
    columnWidth?: ListExpressionValue<Big>;
    columnAlign?: ListExpressionValue<string>;
    columnOrder?: ListExpressionValue<Big>;
}

export interface ColumnsPreviewType {
    columnKey: string;
    caption: string;
    groupKey: string;
    groupCaption: string;
    visible: boolean;
    renderType: RenderTypeEnum;
    attributeValue: string;
    dynamicTextValue: string;
    linkCaption: string;
    linkAction: {} | null;
    allowRowEvents: boolean;
    sortable: boolean;
    align: AlignEnum;
    width: number | null;
    ellipsis: boolean;
}

export interface DynamicColumnsPreviewType {
    columnsSource: {} | { caption: string } | { type: string } | null;
    cellsAttribute: string;
    columnKey: string;
    columnTitle: string;
    columnValueKey: string;
    columnGroupKey: string;
    columnGroupTitle: string;
    columnVisible: string;
    columnWidth: string;
    columnAlign: string;
    columnOrder: string;
}

export interface AxMuiTableContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    dataSource: ListValue;
    selection?: SelectionSingleValue | SelectionMultiValue;
    selectedKeysAttr?: EditableValue<string>;
    title?: DynamicValue<string>;
    stickyHeader: boolean;
    tableHeight: number;
    dense: boolean;
    paginationMode: PaginationModeEnum;
    defaultPageNumber: number;
    pageSize: number;
    showSizeChanger: boolean;
    showRowCount: boolean;
    selectionMethod: SelectionMethodEnum;
    showSelectAll: boolean;
    keepSelection: boolean;
    columns: ColumnsType[];
    dynamicColumns: DynamicColumnsType[];
    onRowClick?: ListActionValue;
    onRowDoubleClick?: ListActionValue;
}

export interface AxMuiTablePreviewProps {
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
    dataSource: {} | { caption: string } | { type: string } | null;
    selection: "None" | "Single" | "Multi";
    selectedKeysAttr: string;
    title: string;
    stickyHeader: boolean;
    tableHeight: number | null;
    dense: boolean;
    paginationMode: PaginationModeEnum;
    defaultPageNumber: number | null;
    pageSize: number | null;
    showSizeChanger: boolean;
    showRowCount: boolean;
    selectionMethod: SelectionMethodEnum;
    showSelectAll: boolean;
    keepSelection: boolean;
    columns: ColumnsPreviewType[];
    dynamicColumns: DynamicColumnsPreviewType[];
    onRowClick: {} | null;
    onRowDoubleClick: {} | null;
    onSelectionChanged: {} | null;
}
