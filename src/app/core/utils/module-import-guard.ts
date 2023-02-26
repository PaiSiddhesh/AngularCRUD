// core module should import once as we kept all singleton object inside core .....(services , interceptor)

export function throwIfAlreadyLoaded (parentModule:any,moduleName:string){
     if(parentModule){
        throw new Error(
            ` ${moduleName} has already loaded . import Core Module in the AppModule .`
        )
     }
}
