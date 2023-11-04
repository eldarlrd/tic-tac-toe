/**
 * @license AGPL-3.0-only
 * Tic Tac Toe - A classic Tic Tac Toe game
 * Copyright (C) 2023 Eldar Pashazade <eldarlrd@pm.me>
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

import { render } from 'inferno';
import App from './app.js';

render(<App />, document.getElementById('app'));
