/**
 * @license AGPL-3.0-only
 * Tic Tac Toe - A classic Tic Tac Toe game
 * Copyright (C) 2023-2025 Eldar Pashazade <eldarlrd@pm.me>
 *
 * This file is part of Tic Tac Toe.
 *
 * Tic Tac Toe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, version 3.
 *
 * Tic Tac Toe is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Tic Tac Toe. If not, see <https://www.gnu.org/licenses/>.
 */

import { createElement as h, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/app.ts';

const root = document.getElementById('root');

if (root) createRoot(root).render(h(StrictMode, null, h(App, {})));

const registerSW = (): void => {
  if ('serviceWorker' in navigator)
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/tic-tac-toe/sw.js', {
          scope: '/tic-tac-toe/'
        })
        .catch((error: unknown) => {
          if (error instanceof Error) console.error(error);
        });
    });
};

registerSW();
