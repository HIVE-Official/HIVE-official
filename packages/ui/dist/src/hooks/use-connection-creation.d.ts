/**
 * Connection Creation Hook
 *
 * Handles wire dragging logic for creating connections between element ports.
 */
import { type Position, type Connection, type Element, type Port } from '@/lib/hivelab-utils';
interface UseConnectionCreationOptions {
    containerRef: React.RefObject<HTMLElement>;
    onConnectionCreated?: (connection: Connection) => void;
    onConnectionFailed?: (reason: string) => void;
}
export declare function useConnectionCreation({ containerRef, onConnectionCreated, onConnectionFailed, }: UseConnectionCreationOptions): {
    isConnecting: boolean;
    draftConnectionPath: string;
    draftConnectionColor: any;
    handlePortMouseDown: (element: Element, port: Port, e: React.MouseEvent) => void;
    handlePortClick: (element: Element, port: Port) => void;
    findPortAtPosition: (pos: Position) => {
        element: Element;
        port: Port;
    } | null;
    canConnect: (sourceElement: Element, sourcePort: Port, targetElement: Element, targetPort: Port) => boolean;
    getConnectionColor: (connection: Connection) => string;
};
export {};
//# sourceMappingURL=use-connection-creation.d.ts.map