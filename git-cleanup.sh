#!/bin/bash

# Define a branch principal (main ou master). Altere se necessário.
main_branch="main"

# Garante que estamos na branch principal para evitar deletar a branch atual.
git checkout "$main_branch"

# Sincroniza o repositório local com o remoto para ter a lista mais atualizada.
echo "Sincronizando com o repositório remoto..."
git fetch origin

# Pega a lista de todas as branches remotas.
remote_branches=$(git branch -r | grep -v '>' | sed 's/origin\///' | tr -d ' ' | grep -v "^$main_branch$")

# Pega a lista de todas as branches locais.
local_branches=$(git branch | sed 's/\* //' | tr -d ' ' | grep -v "^$main_branch$")

# Encontra as branches que existem apenas no remoto.
branches_to_delete=""
for remote_branch in $remote_branches; do
    is_local=false
    for local_branch in $local_branches; do
        if [[ "$remote_branch" == "$local_branch" ]]; then
            is_local=true
            break
        fi
    done

    if [[ "$is_local" == false ]]; then
        branches_to_delete+="$remote_branch "
    fi
done

# Verifica se há branches para deletar.
if [ -z "$branches_to_delete" ]; then
    echo "Nenhuma branch remota para deletar. O repositório está limpo."
    exit 0
fi

# Exibe a lista de branches que serão deletadas.
echo "As seguintes branches remotas serão deletadas:"
echo "$branches_to_delete"

# Pergunta ao usuário se ele realmente deseja continuar.
read -p "Você tem certeza que deseja deletar essas branches? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Operação cancelada."
    exit 1
fi

# Deleta as branches remotas.
for branch in $branches_to_delete; do
    echo "Deletando origin/$branch..."
    git push origin --delete "$branch"
done

echo "Branches remotas deletadas com sucesso."