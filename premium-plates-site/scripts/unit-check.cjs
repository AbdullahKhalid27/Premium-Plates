const ts=require('typescript'),fs=require('node:fs');
require.extensions['.ts']=(mod,file)=>mod._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true,target:ts.ScriptTarget.ES2022}}).outputText,file);
for(const file of fs.readdirSync('tests').filter(f=>f.endsWith('.test.ts')))require('../tests/'+file);