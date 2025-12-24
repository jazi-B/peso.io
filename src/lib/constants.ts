export const SERVICES = [
    'General Pest Control',
    'Fumigation',
    'Termite Control',
    'Disinfectant Service',
    'Rodent Control Service',
] as const;

export type ServiceType = typeof SERVICES[number];
