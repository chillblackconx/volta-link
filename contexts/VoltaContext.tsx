
import { createContext } from 'react';
import { VoltaContextType } from '../types';

export const VoltaContext = createContext<VoltaContextType | null>(null);
