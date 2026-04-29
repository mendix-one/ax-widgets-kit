import { ErrorBoundary, } from '@ax/shared'
import { configure } from 'mobx'
import { type ReactElement, useEffect } from 'react'

import { DataTableProvider, useDataTableStore } from './main/context'
import { DataTable } from './main/DataTable'
import {
    DataTableStore,
} from './main/store'



import type { AxDataTableContainerProps } from '../typings/AxDataTableProps'
import { buildPagination, buildStoreConfig, buildStoreEvent, syncRuntimeState } from './helper/TableOptionHelper'


configure({ isolateGlobalState: true })

export function AxDataTable(props: AxDataTableContainerProps): ReactElement {
    return (
        <ErrorBoundary>
            <DataTableProvider createStore={() => new DataTableStore()}>
                <AxDataTableSync {...props} />
            </DataTableProvider>
        </ErrorBoundary>
    )
}

function AxDataTableSync(props: AxDataTableContainerProps): ReactElement {
    const store = useDataTableStore()

    useEffect(() => {
        buildStoreEvent(props, store)
        buildStoreConfig(props, store)
        syncRuntimeState(props, store)
    }, [
        props,
        store,
    ])

    useEffect(() => {
        buildPagination(props.dataSource, store)
    }, [props.dataSource, store])

    return <DataTable />
}