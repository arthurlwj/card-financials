type MaybePg = {
    driverError?: {code?: unknown; constraint?: unknown; detail?: unknown};
    code?: unknown;
};


export function getPgCode(err: unknown): string | undefined {
    const e = err as MaybePg;
    if(typeof e?.driverError?.code === 'string') return e.driverError.code;
    if(typeof e?.code === 'string') return e.code;
    return undefined;
}

export function getPgConstraint(err: unknown): string | undefined {
    const e = err as MaybePg;
    const c = e?.driverError?.constraint;
    return typeof c === 'string' ? c : undefined
}