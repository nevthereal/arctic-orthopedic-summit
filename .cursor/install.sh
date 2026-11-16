#!/usr/bin/env bash
# Idempotent Cloud Agent bootstrap: Node 24, pnpm 10.5.2, frozen lockfile.
# Invoked by .cursor/environment.json. Safe to run more than once.
set -euo pipefail

NODE_VERSION=24.22.3
PREFIX="${HOME}/.local/node-v${NODE_VERSION}"

if ! "${PREFIX}/bin/node" -v 2>/dev/null | grep -qx "v${NODE_VERSION}"; then
  mkdir -p "${PREFIX}"
  curl -fsSL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz" \
    | tar -xJ -C "${PREFIX}" --strip-components=1
fi

# The default image keeps an older Node ahead of /usr/local/bin. Symlink the
# Node 24 toolchain there, then prefer that directory in login and interactive
# shells so `node` and `pnpm` resolve to this install.
for cmd in node npm npx corepack; do
  sudo ln -sfn "${PREFIX}/bin/${cmd}" "/usr/local/bin/${cmd}"
done

PATH_LINE='export PATH="/usr/local/bin:$PATH"'
touch "${HOME}/.bashrc"
grep -qxF "${PATH_LINE}" "${HOME}/.bashrc" || printf '\n%s\n' "${PATH_LINE}" >> "${HOME}/.bashrc"
printf '%s\n' "${PATH_LINE}" | sudo tee /etc/profile.d/node-path.sh >/dev/null

export PATH="/usr/local/bin:${PATH}"
hash -r

# Enable shims inside the Node prefix. Invoking the /usr/local/bin symlink
# makes Corepack try to write pnpm into /usr/local/bin, which is not writable.
export COREPACK_ENABLE_DOWNLOAD_PROMPT=0
"${PREFIX}/bin/corepack" enable --install-directory "${PREFIX}/bin"
"${PREFIX}/bin/corepack" prepare pnpm@10.5.2 --activate
sudo ln -sfn "${PREFIX}/bin/pnpm" /usr/local/bin/pnpm

pnpm install --frozen-lockfile
