import {
  ThermalPrinter,
  PrinterTypes,
  CharacterSet,
  BreakLine,
} from "node-thermal-printer";
import nodePrinter from "@thiagoelg/node-printer";

let printer = new ThermalPrinter({
  type: PrinterTypes.EPSON, // Printer type: 'star' or 'epson'
  interface: "printer:Xprinter XP-T361U", // Printer interface
  // interface: "printer:Xprinter XP-T361U", // Printer interface
  // interface: "usb:/dev/usb/lp0",
  // interface: "\\.USB003",
  // interface: "//./COM1",
  // interface: "//localhost/Xprinter XP-T361U",
  // interface: "printer:auto",
  characterSet: CharacterSet.ISO8859_2_LATIN2, // Printer character set
  // removeSpecialCharacters: false, // Removes special characters - default: false
  // lineCharacter: "=", // Set character for lines - default: "-"
  // breakLine: BreakLine.WORD, // Break line after WORD or CHARACTERS. Disabled with NONE - default: WORD
  options: {
    // Additional options
    timeout: 5000, // Connection timeout (ms) [applicable only for network printers] - default: 3000
  },
  driver: nodePrinter,
});

const items = [
  {
    productName: 'Product 1',
    price: '123 DA',
    qty: '45',
    amount: '45921 DA'
  },
  {
    productName: 'Product 2',
    price: '123 DA',
    qty: '2340',
    amount: '45912212.00 DA'
  },
]

async function p() {
  try {
    // console.log(nodePrinter.getPrinters());
    let isConnected = await printer.isPrinterConnected(); // Check if printer is connected, return bool of status
    // let execute = await printer.execute(); // Executes all the commands. Returns success or throws error
    // let raw = await printer.raw(Buffer.from("Hello world"));
    // printer.println("Hello world");
    // printer.bold(true);
    // printer.leftRight("Left", "Right");
    // printer.setTextDoubleHeight()
    // printer.setTextDoubleWidth()
    // printer.setTextQuadArea()
    printer.println('Hello world!')
    printer.setTextSize(2, 2)
    printer.println('Hello world!')
    printer.setTextSize(0.5, 2)
    printer.println('Hello world!')
    printer.setTextNormal()
    items.forEach((item) => {
      printer.tableCustom( [{
        text: 'Executes all the commands. Returns success or throws error',
        align: 'LEFT',
        // width: 0.5
        cols: 48 - item.price.length - item.qty.length - item.amount.length,
      },
      
      {
        text: item.price,
        align: 'CENTER',
        // width: 0.5/3
        cols: item.price.length
      },
      
      {
        text: item.qty.toString(),
        align: 'CENTER',
        // width: 0.5/3
        cols: item.qty.length
      }, {
        text: item.amount,
        align: 'RIGHT',
        // width: 0.5/3
        cols: item.amount.length
      }
    
    ])
    })
    printer.drawLine();
    ;
    // printer.code128("Code128");
    // printer.printQR("QR CODE");
    printer.cut();
    // await printer.printImage("./287.png");
    printer.cut();

    // printer.code128("499302010", {
    //   width: "LARGE", // "SMALL", "MEDIUM", "LARGE",
    //   height: 80, // 50 < x < 80
    //   text: 2, // 1 - No text
    // });
    var data = "GS1-128"; // Barcode data (string or buffer)
    var type = 74; // Barcode type (See Reference)
    var settings = {
      // Optional Settings
      hriPos: 0, // Human readable character 0 - 3 (none, top, bottom, both)
      hriFont: 0, // Human readable character font
      width: 3, // Barcode width
      height: 168, // Barcode height
    };

    printer.printBarcode(data, type, settings);
    printer.cut();

    printer.execute(); // Executes all the commands. Returns success or throws error
    console.log({ isConnected });
  } catch (err: any) {
    console.log(err);
  }
} // Print instantly. Returns success or throws error

p();
