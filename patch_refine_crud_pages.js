const fs = require('fs');
const path = require('path');
const appDir = path.join('src', 'app');
const ignored = new Set(['login', 'register', 'forgot-password', 'not-found', 'dashboard']);
const dirs = fs.readdirSync(appDir).filter((name) => {
    const full = path.join(appDir, name);
    return fs.existsSync(full) && fs.statSync(full).isDirectory() && !ignored.has(name);
});

const addImport = (content, importLine) => {
    if (content.includes(importLine)) return content;
    const lines = content.split('\n');
    let idx = 0;
    while (idx < lines.length && lines[idx].startsWith('import ')) {
        idx++;
    }
    lines.splice(idx, 0, importLine);
    return lines.join('\n');
};

const writeIfChanged = (filePath, newContent) => {
    const old = fs.readFileSync(filePath, 'utf8');
    if (old !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log('patched', filePath);
    }
};

dirs.forEach((moduleName) => {
    const modulePath = path.join(appDir, moduleName);
    const listPath = path.join(modulePath, 'page.tsx');
    const createPath = path.join(modulePath, 'create', 'page.tsx');
    const editPath = path.join(modulePath, 'edit', '[id]', 'page.tsx');
    const showPath = path.join(modulePath, 'show', '[id]', 'page.tsx');
    const resourceName = moduleName;

    if (fs.existsSync(listPath)) {
        let content = fs.readFileSync(listPath, 'utf8');
        content = addImport(content, `import { ListView, ListViewHeader } from "@/components/refine-ui/views/list-view";`);
        if (/useTable\(\{/.test(content) && !/resource:\s*"/.test(content)) {
            content = content.replace(/useTable\(\{/, `useTable({\n    resource: \"${resourceName}\",`);
        }
        if (content.includes('<ListView>') && !content.includes('<ListViewHeader')) {
            content = content.replace(/return \(\s*<ListView>\s*/m, 'return (\n    <ListView>\n      <ListViewHeader />\n');
        }
        writeIfChanged(listPath, content);
    }

    if (fs.existsSync(createPath)) {
        let content = fs.readFileSync(createPath, 'utf8');
        content = addImport(content, `import { CreateView, CreateViewHeader } from "@/components/refine-ui/views/create-view";`);
        if (/useForm\(\{/.test(content) && !/resource:\s*"/.test(content)) {
            content = content.replace(/useForm\(\{([\s\S]*?refineCoreProps:\s*)/, `useForm({\n    resource: \"${resourceName}\",\n    action: \"create\",\n$1`);
        }
        if (content.includes('<CreateView>') && !content.includes('<CreateViewHeader')) {
            content = content.replace(/<CreateView>\s*/m, '<CreateView>\n      <CreateViewHeader />\n');
        }
        writeIfChanged(createPath, content);
    }

    if (fs.existsSync(editPath)) {
        let content = fs.readFileSync(editPath, 'utf8');
        content = addImport(content, `import { EditView, EditViewHeader } from "@/components/refine-ui/views/edit-view";`);
        if (/useForm\(\{/.test(content) && !/resource:\s*"/.test(content)) {
            content = content.replace(/useForm\(\{([\s\S]*?refineCoreProps:\s*)/, `useForm({\n    resource: \"${resourceName}\",\n    action: \"edit\",\n$1`);
        }
        if (content.includes('<EditView>') && !content.includes('<EditViewHeader')) {
            content = content.replace(/<EditView>\s*/m, '<EditView>\n      <EditViewHeader />\n');
        }
        writeIfChanged(editPath, content);
    }

    if (fs.existsSync(showPath)) {
        let content = fs.readFileSync(showPath, 'utf8');
        content = addImport(content, `import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";`);
        if (/useShow\(\{\}\)/.test(content)) {
            content = content.replace(/useShow\(\{\}\)/, `useShow({ resource: \"${resourceName}\" })`);
        }
        if (content.includes('<ShowView>') && !content.includes('<ShowViewHeader')) {
            content = content.replace(/<ShowView>\s*/m, '<ShowView>\n      <ShowViewHeader />\n');
        }
        writeIfChanged(showPath, content);
    }
});
console.log('done patching');
