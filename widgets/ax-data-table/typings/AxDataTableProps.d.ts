/**
 * This file was generated from AxDataTable.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { DynamicValue, EditableValue, ListValue, ListActionValue, ListAttributeValue, ListExpressionValue, SelectionSingleValue, SelectionMultiValue } from "mendix";
import { Big } from "big.js";

export type PaginationModeEnum = "pagingButtons" | "virtualScroll" | "loadMore" | "none";

export type PaginationVerticalPositionEnum = "above" | "below" | "both";

export type PaginationHorizontalAlignEnum = "left" | "center" | "right";

export type SelectionMethodEnum = "checkbox" | "radio" | "row";

export type RenderTypeEnum = "attribute" | "dynamicText" | "link";

export type AlignEnum = "left" | "center" | "right";

export type FixedEnum = "none" | "left" | "right";

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
    fixed: FixedEnum;
    ellipsis: boolean;
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
    fixed: FixedEnum;
    ellipsis: boolean;
}

export interface AxDataTableContainerProps {
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
    bordered: boolean;
    paginationMode: PaginationModeEnum;
    defaultPageNumber: number;
    pageSize: number;
    showSizeChanger: boolean;
    showRowCount: boolean;
    paginationVerticalPosition: PaginationVerticalPositionEnum;
    paginationHorizontalAlign: PaginationHorizontalAlignEnum;
    selectionMethod: SelectionMethodEnum;
    showSelectAll: boolean;
    keepSelection: boolean;
    columns: ColumnsType[];
    dynamicColumnsSource?: ListValue;
    dynamicCellsAttribute?: ListAttributeValue<string>;
    dynamicColumnKey?: ListExpressionValue<string>;
    dynamicColumnTitle?: ListExpressionValue<string>;
    dynamicColumnValueKey?: ListExpressionValue<string>;
    dynamicColumnGroupKey?: ListExpressionValue<string>;
    dynamicColumnGroupTitle?: ListExpressionValue<string>;
    dynamicColumnVisible?: ListExpressionValue<boolean>;
    dynamicColumnWidth?: ListExpressionValue<Big>;
    dynamicColumnAlign?: ListExpressionValue<string>;
    dynamicColumnFixed?: ListExpressionValue<string>;
    onRowClick?: ListActionValue;
    onRowDoubleClick?: ListActionValue;
}

export interface AxDataTablePreviewProps {
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
    bordered: boolean;
    paginationMode: PaginationModeEnum;
    defaultPageNumber: number | null;
    pageSize: number | null;
    showSizeChanger: boolean;
    showRowCount: boolean;
    paginationVerticalPosition: PaginationVerticalPositionEnum;
    paginationHorizontalAlign: PaginationHorizontalAlignEnum;
    selectionMethod: SelectionMethodEnum;
    showSelectAll: boolean;
    keepSelection: boolean;
    columns: ColumnsPreviewType[];
    dynamicColumnsSource: {} | { caption: string } | { type: string } | null;
    dynamicCellsAttribute: string;
    dynamicColumnKey: string;
    dynamicColumnTitle: string;
    dynamicColumnValueKey: string;
    dynamicColumnGroupKey: string;
    dynamicColumnGroupTitle: string;
    dynamicColumnVisible: string;
    dynamicColumnWidth: string;
    dynamicColumnAlign: string;
    dynamicColumnFixed: string;
    onRowClick: {} | null;
    onRowDoubleClick: {} | null;
    onSelectionChanged: {} | null;
}
