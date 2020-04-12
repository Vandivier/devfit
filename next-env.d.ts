/// <reference types="next" />
/// <reference types="next/types/global" />

type ErrorMessage = {
    header: string;
    content: string;
    info?: boolean;
    negative?: boolean;
    positive?: boolean;
    warning?: boolean;
}