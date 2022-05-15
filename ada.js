(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("codemirror/lib/codemirror.js"), require("codemirror/addon/mode/simple.js"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["codemirror/lib/codemirror.js", "codemirror/addon/mode/simple.js"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineSimpleMode("ada",{
  start: [
    // single and double quote string
    {regex: /'.'/, token: "string-2"},
    // character
    {regex: /"/, token: " string", next: "string"},
    // numbers
    {regex: /([1-9]|1[0-6])#[0-9a-f]([_]?[0-9a-f])*/i, token: "number"},
    {regex: /[+-]?\d([_]?\d)*(\.\d([_]?\d)*)?([eE][+-]?\d([_]?\d)*)?/, token: "number"},
    // keywords
    {regex: /begin/, token: "keyword", indent: true, dedent: true},
    {regex: /(subtype|type)(\s+\S+\s+)(is)/, token: ["keyword", null, "keyword"]},
    {regex: /(end loop|end record|end)/, token: "keyword", dedent: true},
    {regex: /(declare|is|loop|record)$/, token: "keyword", indent: true},
    {regex: /\b(abort|else|new|return|elsif|reverse|abstract|accept|entry|select|access|exception|of|separate|aliased|exit|some|all|others|subtype|for|out|synchronized|array|function|overriding|tagged|generic|package|task|begin|goto|pragma|terminate|body|private|then|if|procedure|type|case|protected|constant|interface|until|raise|use|declare|range|delay|limited|when|delta|while|digits|renames|with|do|requeue)\b/i, token: "keyword"},
    {regex: /\b(?:true|false|null)\b/i, token: "builtin"},
    // operators
    {regex: /:=|\/=|>=|>|<=|<|=|\*\*|\.\.|&/, token: "operator"},
    {regex: /(?:\s+)(mod|rem|abs|in|not|and|xor|or)(?:\s+)/, token: "operator"},
    // Ada attributes
    {regex: /'(Access|Address|Adjacent|Aft|Alignment|Base|Bit_Order|Body_Version|Callable|Caller|Ceiling|Class|Component_Size|Compose|Constrained|Copy_Sign|Count|Definite|Delta|Denorm|Digits|Exponent|External_Tag|First|First_Bit|Floor|Fore|Fraction|Has_Same_Storage|Identity|Image|Input|Last|Last_Bit|Leading_Part|Length|Machine|Machine_Emax|Machine_Emin|Machine_Mantissa|Machine_Overflows|Machine_Radix|Machine_Rounding|Machine_Rounds|Max|Max_Alignment_For_Allocation|Max_Size_In_Storage_Elements|Min|Mod|Model|Model_Emin|Model_Epsilon|Model_Mantissa|Model_Small|Modulus|Old|Output|Overlaps_Storage|Partition_ID|Pos|Position|Pred|Priority|Range|Read|Remainder|Result|Round|Rounding|Safe_First|Safe_Last|Scale|Scaling|Signed_Zeros|Size|Small|Storage_Pool|Storage_Size|Stream_Size|Succ|Tag|Terminated|Truncation|Unbiased_Rounding|Unchecked_Access|Val|Valid|Value|Version|Wide_Image|Wide_Value|Wide_Wide_Image|Wide_Wide_Value|Wide_Wide_Width|Wide_Width|Width|Write)\b/i, token: "attribute"},
    // GNAT attributes
    {regex: /'(Abort_Signal|Address_Size|Asm_Input|Asm_Output|AST_Entry|Bit|Bit_Position|Code_Address|Default_Bit_Order|Elaborated|Elab_Body|Elab_Spec|Emax|Enabled|Enum_Rep|Enum_Val|Epsilon|Fixed_Value|Has_Access_Values|Has_Discriminants|Img|Integer_Value|Invalid_Value|Machine_Size|Max_Interrupt_Priority|Max_Priority|Maximum_Alignment|Mechanism_Code|Null_Parameter|Object_Size|Old|Passed_By_Reference|Pool_Address|Range_Length|Storage_Unit|Stub_Type|Target_Name|Tick|To_Address|Type_Class|UET_Address|Unconstrained_Array|Universal_Literal_String|Unrestricted_Access|VADS_Size|Value_Size|Wchar_T_Size|Word_Size)\b/i, token: "attribute"},
    // comments
    {regex: /--.*/, token: "comment"},
    {regex: /\w+/, token: null}
  ],
  string: [
    {regex: /"/, token: "string", next: "start"},
    {regex: /(?:[^\\"]|\\(?:.|$))*/, token: "string"}
  ],
  meta: {
    electricInput: /^\s*(begin|end)$/,
    lineComment: "--"
  }
});

CodeMirror.defineMIME("text/x-ada", "ada");
});
