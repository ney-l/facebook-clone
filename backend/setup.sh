#!/bin/bash

HOOKS_DIR="../.git/hooks"
PRE_COMMIT_HOOK="${HOOKS_DIR}/pre-commit"

echo "#!/bin/bash" > "${PRE_COMMIT_HOOK}"
echo "cd backend && yarn run lint && yarn run format:fix" >> "${PRE_COMMIT_HOOK}"
echo "cd frontend && yarn run lint && yarn run format:fix" >> "${PRE_COMMIT_HOOK}"
chmod +x "${PRE_COMMIT_HOOK}"