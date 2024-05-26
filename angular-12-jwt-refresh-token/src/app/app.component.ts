import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenStorageService } from './_services/token-storage.service';
import { EventBusService } from './_shared/event-bus.service';
import { DataService } from './_services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  title = "Hdanh1";

  data_CTDT = [
    {
      isParent: true,
      data: "Tiêu chuẩn 1. Mục tiêu và chuẩn đầu ra của chương trình đào tạo"
    },
    {
      isParent: false,
      criteria: "TC 1.1. Mục tiêu của CTĐT được xác định rõ ràng, phù hợp với sứ mạng và tầm nhìn của CSGD đại học, phù hợp với mục tiêu của giáo dục đại học quy định tại Luật giáo dục đại học.",
      requirement: `1. Mục tiêu của CTĐT được xác định rõ ràng.
      2. Mục tiêu của CTĐT phù hợp với sứ mạng và tầm nhìn của CSGD.
      3. Mục tiêu của CTĐT phù hợp với mục tiêu của giáo dục đại học quy định tại Luật giáo dục đại học.
      `,
      benchmark: `1. Mục tiêu của CTĐT được xác định rõ ràng.
      2. Mục tiêu của CTĐT phù hợp với sứ mạng và tầm nhìn của CSGD.
      3. Mục tiêu của CTĐT phù hợp với mục tiêu của giáo dục đại học quy định tại Luật giáo dục đại học.
      `,
      evidence: `-	Văn bản chính thức phát biểu về tầm nhìn, sứ mạng của CSGD*.
      -	Quyết định ban hành CTĐT*. 
      -	Bản mô tả/đề cương CTĐT và bản mô tả/đề cương môn học/học phần*.
      -	Ma trận kỹ năng*.
      -	Tài liệu khảo sát về nhu cầu của thị trường lao động liên quan đến CTĐT trong vòng 5 năm tính đến thời điểm đánh giá*.
      -	Biên bản họp lấy ý kiến của các bên liên quan về CTĐT*.
      -	Trang thông tin điện tử của CSGD/khoa có đề cập đến CTĐT.
      -	Các báo cáo kết quả KĐCLGD và đối sánh.
      `,
    },
    {
      isParent: false,
      criteria: "TC 1.2. CĐR của CTĐT được xác định rõ ràng, bao quát được cả các yêu cầu chung và yêu cầu chuyên biệt mà NH cần đạt được sau khi hoàn thành CTĐT.",
      requirement: `1.	CĐR của CTĐT được xác định rõ ràng.
      2.	CĐR của CTĐT bao quát được cả các yêu cầu chung và yêu cầu chuyên biệt mà NH cần đạt được sau khi hoàn thành CTĐT.
      `,
      benchmark: `1. CĐR của CTĐT được xác định rõ ràng.
      2. CĐR của CTĐT phải nêu cụ thể kiến thức, kỹ năng, mức tự chủ và trách nhiệm đối với NH tốt nghiệp và triển vọng việc làm trong tương lai. 
      `,
      evidence: `- Văn bản chính thức phát biểu về tầm nhìn, sứ mạng của CSGD.
      -	Bản mô tả/đề cương CTĐT và đề cương môn học/học phần*.
      -	Tài liệu quảng bá, các bản tin về CTĐT.
      -	Ma trận kỹ năng*.
      -	Biên bản họp lấy ý kiến của các bên liên quan về CTĐT*.
      -	Trang thông tin điện tử của CSGD/khoa có đề cập đến CTĐT.
      -	Các báo cáo kết quả KĐCLGD và đối sánh. 
      -	Kết quả khảo sát GV, NH và NH tốt nghiệp.
      `,
    },
    {
      isParent: false,
      criteria: "TC 1.3. CĐR của CTĐT phản ánh được yêu cầu của các bên liên quan, được định kỳ rà soát, điều chỉnh và được công bố công khai.",
      requirement: `1.	CĐR của CTĐT phản ánh được yêu cầu của các bên liên quan.
      2.	CĐR của CTĐT được định kỳ rà soát, điều chỉnh. 
      3.	CĐR của CTĐT được công bố công khai.       
      `,
      benchmark: `1. CĐR của CTĐT phản ánh được yêu cầu của các bên liên quan; có sự tham gia ý kiến của các bên liên quan trong quá trình xây dựng.
      2. CĐR của CTĐT được định kỳ rà soát, điều chỉnh ít nhất 2 năm một lần theo kế hoạch của nhà trường. 
      3. CĐR của CTĐT được công bố công khai.       
      `,
      evidence: `-	Bản mô tả/đề cương CTĐT và đề cương môn học/học phần*.
      -	Tài liệu quảng bá, các bản tin về CTĐT.
      -	Ma trận kỹ năng*.
      -	Kết quả khảo sát nhu cầu của thị trường lao động liên quan đến CTĐT*.
      -	Biên bản họp/bản góp ý của các bên liên quan, đặc biệt là nhà sử dụng lao động*.
      -	Trang thông tin điện tử của CSGD/khoa công bố công khai CĐR của CTĐT*.
      -	Các báo cáo kết quả KĐCLGD và đối sánh.
      -	Các biên bản họp và tài liệu lưu trữ về hoạt động rà soát CĐR của CTĐT*.
      -	Văn bản của nhà trường về CĐR của CTĐT được định kỳ rà soát, điều chỉnh.
      -	Bảng so sánh kết quả xếp loại đối với NH tốt nghiệp CTĐT trong 5 năm của chu kỳ đánh giá.      
      `,
    },
    {
      isParent: true,
      data: "Tiêu chuẩn 2. Bản mô tả chương trình đào tạo"
    },
    {
      isParent: false,
      criteria: "TC 2.1. Bản mô tả CTĐT đầy đủ thông tin và cập nhật.",
      requirement: `1.	Bản mô tả CTĐT có đầy đủ thông tin và cập nhật. `,
      benchmark: `1.	Bản mô tả CTĐT có đủ các nội dung .
      2.	 Bản mô tả CTĐT được cập nhật những vấn đề mới nhất có liên quan.
      `,
      evidence: `-	Bản mô tả/đề cương CTĐT và bản mô tả/đề cương môn học/học phần bao gồm các phiên bản cũ và mới nhất*.
      -	Tờ rơi, tài liệu quảng bá về CTĐT, môn học, bản tin.
      -	Trang thông tin điện tử của CSGD/khoa.
      -	Biên bản họp/bản góp ý lấy ý kiến của các bên liên quan*.
      -	Biên bản họp/tài liệu về hoạt động rà soát CTĐT*.
      -	Báo cáo kết quả KĐCLGD và đối sánh.
      -	Kế hoạch/báo cáo xây dựng/điều chỉnh Bản mô tả CTĐT được phê duyệt*.      
      `,
    },
    {
      isParent: false,
      criteria: "TC 2.2. Đề cương các học phần đầy đủ thông tin và cập nhật. ",
      requirement: `Đề cương các học phần có đầy đủ thông tin và cập nhật.
      `,
      benchmark: `1. 100% đề cương các môn học/học phần trong CTĐT phải đầy đủ thông tin .
      2. 100% đề cương các môn học/học phần trong CTĐT được định kỳ rà soát, bổ sung/điều chỉnh/cập nhật theo kế hoạch của nhà trường.          
      `,
      evidence: `-	Đề cương của tất cả các môn học/học phần trong CTĐT đối với các phiên bản trong 5 năm của chu kỳ đánh giá*.
      -	Bản mô tả môn học/học phần trong CTĐT*.
      -	Tờ rơi, tài liệu quảng bá môn học/học phần, bản tin.
      -	Trang thông tin điện tử của CSGD/khoa.
      -	Biên bản họp/ý kiến góp ý của các bên liên quan về nội dung, chất lượng của các môn học/học phần*. 
      -	Biên bản họp/tài liệu liên quan đến hoạt động rà soát đề cương môn học/học phần*.
      -	Báo cáo kết quả KĐCLGD và đối sánh chất lượng liên quan đến môn học/học phần.         
      `,
    },
    {
      isParent: false,
      criteria: "TC 2.3. Bản mô tả CTĐT và đề cương các học phần được công bố công khai và các bên liên quan dễ dàng tiếp cận.",
      requirement: `1.	Bản mô tả CTĐT và đề cương các học phần được công bố công khai.
      2.	Các bên liên quan dễ dàng tiếp cận với bản mô tả CTĐT và đề cương các học phần.            
      `,
      benchmark: `1.	Bản mô tả CTĐT được công bố công khai bằng nhiều hình thức khác nhau.
      2.	100% đề cương các môn học/học phần trong CTĐT được công bố công khai bằng nhiều hình thức khác nhau.
      3.	Các bên liên quan như cơ quan quản lý, nhà sử dụng lao động, GV, NH, NH đã tốt nghiệp … đều có thể tiếp cận với bản mô tả CTĐT một cách dễ dàng và thuận tiện nhất.
      `,
      evidence: `-	Bản mô tả CTĐT đã được phê duyệt chính thức*.
      -	Đề cương các môn học/học phần trong CTĐT đã được phê duyệt chính thức*.
      -	Các tài liệu chính thống của CSGD/khoa trong đó có phần công bố về bản mô tả CTĐT/đề cương các học phần*.
      -	Trang thông tin điện tử của CSGD/khoa có công bố bản mô tả CTĐT và đề cương các học phần*.
      `,
    },
    {
      isParent: true,
      data: "Tiêu chuẩn 3. Cấu trúc và nội dung chương trình dạy học"
    },
    {
      isParent: false,
      criteria: "TC 3.1. CTDH được thiết kế dựa trên CĐR.",
      requirement: `CTDH được thiết kế dựa trên CĐR.     
      `,
      benchmark: `1. CTDH được thiết kế dựa trên các yêu cầu của CĐR về kiến thức, kỹ năng, mức tự chủ và trách nhiệm.
      2. Việc xác định tổ hợp các phương pháp giảng dạy, học tập, phương pháp kiểm tra/đánh giá kết quả học tập của NH của 100% các môn học/học phần trong CTDH phải phù hợp, góp phần đạt được CĐR.
      `,
      evidence: `-	Bản mô tả CTDH và bản mô tả môn học/học phần*.
      -	Kế hoạch thể hiện đầy đủ các nguồn lực và tiến độ trong việc thực hiện CTDH*.
      -	Ma trận kỹ năng*.
      -	Hồ sơ giảng dạy của GV*.
      -	Mô tả CĐR của CTĐT*.
      -	Góp ý, phản hồi của các bên liên quan (nhà sử dụng lao động, GV, NH, NH đã tốt nghiệp, ...) về CTDH*.
      -	Các báo cáo về KĐCLGD và đối sánh.      
      `,
    },
    {
      isParent: false,
      criteria: "TC 3.2. Đóng góp của mỗi học phần trong việc đạt được CĐR là rõ ràng.",
      requirement: `Mỗi học phần có đóng góp rõ ràng cho việc đạt được CĐR.   
      `,
      benchmark: `. 100% các môn học/học phần trong CTDH có sự tương thích về nội dung và thể hiện được sự đóng góp cụ thể của mỗi môn học/học phần nhằm đạt được CĐR. 
      2. 100% các môn học/học phần trong CTDH xác định rõ tổ hợp các phương pháp dạy và học, phương pháp kiểm tra/đánh giá phù hợp và hỗ trợ nhau tốt nhất để đảm bảo việc đạt được CĐR.
      3. Nội dung các môn học/học phần trong CTDH thể hiện việc đạt được CĐR và định kỳ được lấy ý kiến phản hồi của các bên liên quan.
      `,
      evidence: `-	Bản mô tả CTDH, bản mô tả môn học/học phần*.
      -	Tờ rơi, tài liệu quảng bá chương trình, bản tin về khóa học.
      -	Sơ đồ/kế hoạch thể hiện đầy đủ các nguồn lực và tiến độ trong việc thực hiện CTDH*.
      -	Ma trận kỹ năng*.
      -	Góp ý, phản hồi của các bên liên quan*.
      -	Các biên bản họp/tài liệu liên quan tới hoạt động xây dựng CTDH*.
      -	Biên bản nghiệm thu CTDH và đề cương học phần*.
      -	Các báo cáo về KĐCLGD và đối sánh.      
      `,
    },
    {
      isParent: false,
      criteria: "TC 3.3. CTDH có cấu trúc, trình tự logic; nội dung cập nhật và có tính tích hợp. ",
      requirement: `CTDH có cấu trúc, trình tự logic.
      2. CTDH có nội dung cập nhật.
      3. CTDH có tính tích hợp.           
      `,
      benchmark: `. Các học phần trong CTDH được cấu trúc đảm bảo sự gắn kết và liền mạch giữa các học phần đại cương, cơ sở ngành và chuyên ngành, đảm bảo chương trình trở thành một khối thống nhất.
      2. 100% các môn học/học phần trong CTDH được bố trí hợp lý .
      3. CTDH được định kỳ rà soát/điều chỉnh, bổ sung và cập nhật ít nhất 2 năm 1 lần. 
      4. CTDH khi được điều chỉnh có tham khảo các CTĐT tiên tiến trong nước hoặc quốc tế đảm bảo tính linh hoạt và tích hợp. 
      `,
      evidence: `-	Bản mô tả CTDH và bản mô tả môn học/học phần*.
      -	Tờ rơi, tài liệu quảng bá chương trình, bản tin về khóa học.
      -	Kế hoạch thể hiện đầy đủ các nguồn lực và tiến độ trong việc thực hiện CTDH*.
      -	Ma trận kỹ năng.
      -	Góp ý, phản hồi của các bên liên quan.
      -	Trang thông tin điện tử của CSGD và của khoa.
      -	Các biên bản họp và tài liệu lưu trữ về hoạt động rà soát, điều chỉnh CTDH*.
      -	Biên bản nghiệm thu CTDH và đề cương học phần*.
      -	Các báo cáo về KĐCLGD và đối sánh.
      -	Tài liệu quy định/hướng dẫn việc xây dựng CTDH trong đó nêu rõ yêu cầu, bố cục, cấu trúc của CTDH*.      
      `,
    },
  ];

  data_CSGD = [
    {
      isParent: true,
      data: "Tiêu chuẩn 1. Tầm nhìn, sứ mạng và văn hóa"
    },
    {
      isParent: false,
      criteria: "TC 1.1. Lãnh đạo CSGD đảm bảo tầm nhìn và sứ mạng của CSGD đáp ứng được nhu cầu và sự hài lòng của các bên liên quan.",
      requirement: `Lãnh đạo CSGD đảm bảo tầm nhìn và sứ mạng của CSGD đáp ứng được nhu cầu và sự hài lòng của các bên liên quan.
      `,
      benchmark: `2.	CSGD có tuyên bố chính thức về tầm nhìn, sứ mạng.
      3.	Có sự tham gia của các bên liên quan (cán bộ quản lý, GV, NH, nhà sử dụng lao động, các tổ chức xã hội-nghề nghiệp, ...) trong quá trình xây dựng tầm nhìn, sứ mạng.
      4.	Nội dung tuyên bố về tầm nhìn, sứ mạng phù hợp với chức năng, nhiệm vụ, nguồn lực và định hướng phát triển của CSGD; phù hợp với chiến lược phát triển kinh tế-xã hội của ngành và/hoặc địa phương, cả nước.
      5.	Lãnh đạo CSGD có các kế hoạch, hướng dẫn các đơn vị xây dựng và triển khai các hoạt động theo tầm nhìn, sứ mạng đã được xác định.
      `,
      evidence: `- Văn bản tuyên bố chính thức về tầm nhìn, sứ mạng có phê duyệt của lãnh đạo CSGD*.
      - Các tài liệu họp bàn, các bản tổng hợp ý kiến góp ý của các bên liên quan tham gia xây dựng tầm nhìn, sứ mạng của CSGD*.
      - Trang thông tin điện tử, các tài liệu giới thiệu về CSGD, các văn bản về chức năng, nhiệm vụ/kế hoạch/chiến lược của CSGD.
      - Chiến lược phát triển ngành, chiến lược phát triển kinh tế - xã hội của địa phương/cả nước còn hiệu lực.
      - Các văn bản của CSGD về việc xây dựng tầm nhìn, sứ mạng*.
      `,
    },
    {
      isParent: false,
      criteria: "TC 1.2. Lãnh đạo CSGD thúc đẩy các giá trị văn hóa phù hợp với tầm nhìn và sứ mạng của CSGD.",
      requirement: `Lãnh đạo CSGD thúc đẩy các giá trị văn hóa phù hợp với tầm nhìn và sứ mạng của CSGD.`,
      benchmark: `. CSGD có công bố chính thức giá trị văn hóa/giá trị cốt lõi của CSGD.
      2. Giá trị văn hóa/giá trị cốt lõi của CSGD được xác định từ các giá trị/truyền thống của CSGD nhằm thúc đẩy các hành vi mong muốn của CSGD để đạt được mục tiêu chiến lược của CSGD, phù hợp với tầm nhìn, sứ mạng.
      3. Lãnh đạo CSGD xây dựng kế hoạch nhằm phổ biến và hướng dẫn các đơn vị, cá nhân trong CSGD xây dựng kế hoạch hoạt động cụ thể để giữ gìn và phát triển giá trị văn hóa/giá trị cốt lõi của CSGD.
      `,
      evidence: `Văn bản tuyên bố chính thức về giá trị văn hóa/giá trị cốt lõi của CSGD*.
      - Các kế hoạch hành động, truyền thông về giá trị văn hóa/giá trị cốt lõi của CSGD*.
      - Các tài liệu họp bàn, các bản tổng hợp ý kiến góp ý của các bên liên quan tham gia xây dựng kế hoạch hành động, nhiệm vụ ưu tiên để giữ gìn bản sắc, văn hóa, thương hiệu của CSGD*.
      - Trang thông tin điện tử, các tài liệu giới thiệu về CSGD, các văn bản về chức năng, nhiệm vụ/kế hoạch/chiến lược của CSGD.
      - Các bảng/biển thông báo trong khuôn viên của CSGD có phát biểu về giá trị văn hóa/giá trị cốt lõi của CSGD.      
      `,
    },
    {
      isParent: false,
      criteria: "TC 1.3. Tầm nhìn, sứ mạng và văn hóa của CSGD được phổ biến, quán triệt và giải thích rõ ràng để thực hiện.",
      requirement: `1.	Tầm nhìn, sứ mạng và văn hóa của CSGD được phổ biến để thực hiện.
      2.	Tầm nhìn, sứ mạng và văn hóa của CSGD được quán triệt và giải thích rõ ràng để thực hiện.          
      `,
      benchmark: `1. CSGD có truyền thông, phổ biến về tầm nhìn, sứ mạng và văn hóa đến các bên liên quan.
      2. Tầm nhìn, sứ mạng và văn hóa của CSGD được quán triệt và giải thích rõ ràng cho các bên liên quan trong CSGD để thực hiện.           
      `,
      evidence: `- Văn bản tuyên bố chính thức về tầm nhìn, sứ mạng, văn hóa của CSGD*.
      - Các tài liệu liên quan đến việc triển khai các kế hoạch hành động, truyền thông, phổ biến về tầm nhìn, sứ mạng và văn hóa của CSGD*.
      - Các tài liệu họp bàn, các bản tổng hợp ý kiến góp ý của các bên liên quan tham gia xây dựng kế hoạch hành động, nhiệm vụ ưu tiên để đạt được sứ mạng, tầm nhìn và để giữ gìn bản sắc và văn hóa, thương hiệu của CSGD*.
      - Các bảng/biển thông báo trong khuôn viên của CSGD có tuyên bố chính thức về tầm nhìn, sứ mạng, văn hóa*.
      - Trang thông tin điện tử, các tài liệu giới thiệu về CSGD, các văn bản về chức năng, nhiệm vụ/kế hoạch/chiến lược của CSGD, ...
      - Các chiến lược phát triển, kế hoạch phát triển CSGD dài hạn, trung hạn, kế hoạch hoạt động hằng năm.         
      `,
    },
    {
      isParent: false,
      criteria: "TC 1.4. Tầm nhìn, sứ mạng và văn hóa của CSGD được rà soát để đáp ứng nhu cầu và sự hài lòng của các bên liên quan.",
      requirement: `1.Tầm nhìn, sứ mạng và văn hóa của CSGD được rà soát để đáp ứng nhu cầu và sự hài lòng của các bên liên quan.    
      `,
      benchmark: `1. Có đơn vị, bộ phận chịu trách nhiệm triển khai thực hiện việc rà soát. 
      2. Tổ chức lấy ý kiến của các bên liên quan để điều chỉnh tầm nhìn, sứ mạng và văn hóa của CSGD ít nhất một lần trong 5 năm của chu kỳ đánh giá nhằm đáp ứng nhu cầu và sự hài lòng của các bên liên quan.
      3. Có báo cáo kết quả rà soát về tầm nhìn, sứ mạng và giá trị cốt lõi.               
      `,
      evidence: `- Các văn bản giao nhiệm vụ cho đơn vị, bộ phận chịu trách nhiệm triển khai thực hiện việc rà soát tầm nhìn, sứ mạng và văn hóa*.
      - Báo cáo kết quả rà soát về tầm nhìn, sứ mạng và văn hóa*.
      - Các tài liệu họp bàn, bản tổng hợp ý kiến góp ý của các bên liên quan tham gia rà soát, điều chỉnh tầm nhìn, sứ mạng và văn hoá của CSGD*. 
      - Các nghị quyết của Đảng ủy, các văn bản về chiến lược, chính sách của CSGD qua các thời kỳ.
      - Biên bản các cuộc họp của Đảng ủy, hội đồng trường/hội đồng quản trị, các quyết nghị có liên quan đến tuyên bố tầm nhìn, sứ mạng và văn hoá.          
      `,
    },
    {
      isParent: false,
      criteria: "TC 1.5. Tầm nhìn, sứ mạng và văn hóa của CSGD cũng như quá trình xây dựng và phát triển chúng được cải tiến để đáp ứng nhu cầu và sự hài lòng của các bên liên quan.",
      requirement: `1. Tầm nhìn, sứ mạng và văn hóa của CSGD được cải tiến để đáp ứng nhu cầu và sự hài lòng của các bên liên quan.
      2. Quy trình xây dựng và phát triển tầm nhìn, sứ mạng và văn hóa của CSGD được cải tiến để đáp ứng nhu cầu và sự hài lòng của các bên liên quan.            
      `,
      benchmark: `1.	Có quy trình, đơn vị/bộ phận giám sát, rà soát, triển khai cải tiến chất lượng việc xây dựng, rà soát, phát triển tầm nhìn, sứ mạng và văn hóa.
      2.	Tầm nhìn, sứ mạng và văn hóa của CSGD được điều chỉnh nhằm đáp ứng nhu cầu và sự hài lòng của của các bên liên quan.
      3.	Quy trình xây dựng, rà soát và phát triển tầm nhìn, sứ mạng và văn hóa được cải tiến ít nhất một lần trong 5 năm của chu kỳ đánh giá.           
      `,
      evidence: `- Các văn bản phân công cho đơn vị, bộ phận chịu trách nhiệm theo dõi, giám sát, triển khai cải tiến chất lượng việc xây dựng, rà soát, phát triển tầm nhìn, sứ mạng và văn hóa*.
      - Văn bản điều chỉnh về tầm nhìn, sứ mạng và văn hóa của CSGD*.
      - Các quy trình xây dựng, rà soát và phát triển tầm nhìn, sứ mạng và văn hoá*.
      - Dữ liệu khảo sát, báo cáo kết quả cải tiến, ý kiến phản hồi của các bên liên quan về tầm nhìn, sứ mạng và văn hóa của CSGD*.
      - Các nghị quyết của Đảng ủy, các văn bản về chiến lược, chính sách của CSGD qua các thời kỳ.
      - Biên bản các cuộc họp của Đảng ủy, hội đồng trường/hội đồng quản trị, các quyết nghị về sự thay đổi trong tuyên bố tầm nhìn, sứ mạng và văn hóa.       
      `,
    },
    {
      isParent: true,
      data: "Tiêu chuẩn 2. Quản trị"
    },
    {
      isParent: false,
      criteria: "TC 2.1. Hệ thống quản trị (bao gồm hội đồng quản trị hoặc hội đồng trường; các tổ chức đảng, đoàn thể; các hội đồng tư vấn khác) được thành lập theo quy định của pháp luật nhằm thiết lập định hướng chiến lược phù hợp với bối cảnh cụ thể của CSGD; đảm bảo trách nhiệm giải trình, tính bền vững, sự minh bạch và giảm thiểu các rủi ro tiềm tàng trong quá trình quản trị của CSGD.",
      requirement: `1. Hệ thống quản trị được thành lập theo quy định của pháp luật nhằm thiết lập định hướng chiến lược phù hợp với bối cảnh cụ thể của CSGD.
      2. Hệ thống quản trị đảm bảo trách nhiệm giải trình, tính bền vững, sự minh bạch và giảm thiểu các rủi ro tiềm tàng trong quá trình quản trị của CSGD.
      `,
      benchmark: `. CSGD có thành lập hội đồng quản trị/hội đồng trường; có các tổ chức đảng, đoàn thể, các hội đồng tư vấn đáp ứng quy định của Luật Giáo dục, Luật Giáo dục đại học, Điều lệ trường đại học, các quy định khác của pháp luật và các quy định của đơn vị chủ quản.
      2. Hội đồng quản trị/hội đồng trường; các tổ chức đảng, đoàn thể; các hội đồng tư vấn được quy định rõ chức năng, nhiệm vụ, quyền hạn; có các văn bản thể hiện trách nhiệm giải trình, tính bền vững, sự minh bạch và giảm thiểu các rủi ro tiềm tàng trong quá trình hoạt động.
      3. Có hệ thống văn bản để tổ chức, quản lý một cách có hiệu quả các hoạt động của CSGD.      
      `,
      evidence: `- Các quyết định thành lập các đơn vị trong CSGD trong đó có hội đồng quản trị/hội đồng trường; các tổ chức đảng, đoàn thể; các hội đồng tư vấn khác*.
      - Các văn bản thể hiện trách nhiệm giải trình, tính bền vững, sự minh bạch và giảm thiểu các rủi ro tiềm tàng trong quá trình hoạt động của hội đồng quản trị/hội đồng trường; các tổ chức đảng, đoàn thể; các hội đồng tư vấn*.
      - Quy chế tổ chức và hoạt động của CSGD đã được phê duyệt.
      - Cơ cấu tổ chức trên trang thông tin điện tử và/hoặc trong tài liệu giới thiệu chính thức của CSGD.
      - Các đề án thành lập các đơn vị trong CSGD, trong đó có hội đồng quản trị hoặc hội đồng trường; các tổ chức đảng, đoàn thể; các hội đồng tư vấn.
      - Văn bản quy định về tổ chức và hoạt động của tất cả đơn vị, các tổ chức trong CSGD.
      - Các quyết định bổ nhiệm, luân chuyển cán bộ của tất cả các đơn vị, các tổ chức trong CSGD.
      - Biên bản các cuộc họp Ban giám hiệu, hội đồng trường/hội đồng quản trị, hội đồng tư vấn, các tổ chức đảng, đoàn thể có liên quan.
      `,
    },
    {
      isParent: false,
      criteria: "TC 2.2. Quyết định của các cơ quan quản trị được chuyển tải thành các kế hoạch hành động, chính sách, hướng dẫn để triển khai thực hiện.",
      requirement: `Quyết định của các cơ quan quản trị được chuyển tải thành các kế hoạch hành động, chính sách, hướng dẫn để triển khai thực hiện.
      `,
      benchmark: `1. Các nghị quyết/quyết định/kết luận của Đảng ủy, hội đồng quản trị/hội đồng trường, Ban giám hiệu, Công đoàn, Đoàn thanh niên, Hội sinh viên và các tổ chức đoàn thể khác, các hội đồng tư vấn (hội đồng ĐBCL, hội đồng khoa học và đào tạo, …) được chuyển tải thành các kế hoạch hành động, chính sách, hướng dẫn.
      2. Các kế hoạch hành động, chính sách, hướng dẫn được triển khai thực hiện.           
      `,
      evidence: `- Các nghị quyết/quyết định của cơ quan quản trị*.
      - Các kế hoạch hành động, chính sách, hướng dẫn của cơ quan quản trị*.
      - Biên bản các cuộc họp Ban giám hiệu, hội đồng trường/hội đồng quản trị, hội đồng tư vấn, các tổ chức Đảng, Đoàn thể có liên quan.            
      `,
    },
    {
      isParent: false,
      criteria: "TC 2.3. Hệ thống quản trị của CSGD được rà soát thường xuyên.",
      requirement: `Hệ thống quản trị của CSGD được rà soát thường xuyên.        
      `,
      benchmark: `1. Định kỳ hằng năm rà soát, đánh giá cơ cấu tổ chức, chức năng, nhiệm vụ của các đơn vị, bộ phận và các văn bản của hệ thống quản trị.
      2. Có báo cáo tổng kết, đánh giá hằng năm của các đơn vị, bộ phận của hệ thống quản trị.
      3. Nhân sự tham gia các đơn vị, bộ phận trong hệ thống quản trị và các văn bản của hệ thống quản trị được đánh giá hằng năm.
      `,
      evidence: `-	Kế hoạch kiểm tra, đánh giá, giám sát hằng năm của các đơn vị, bộ phận và các văn bản của hệ thống quản trị*.
      -	Báo cáo tổng kết, đánh giá hằng năm; báo cáo giữa nhiệm kỳ; báo cáo cuối nhiệm kỳ (theo kỳ đại hội) của các đơn vị, bộ phận của hệ thống quản trị*.
      -	Các nhận xét, đánh giá về năng lực lãnh đạo, quản lý của các nhân sự tham gia các đơn vị, bộ phận của hệ thống quản trị*.
      -	Hệ thống văn bản quản lý của CSGD; các quyết định thành lập, điều chỉnh về cơ cấu tổ chức nhân sự của CSGD*.
      -	Các biên bản kiểm tra, báo cáo đánh giá của các tổ chức cấp trên.
      `,
    },
    {
      isParent: false,
      criteria: "TC 2.4. Hệ thống quản trị của CSGD được cải tiến để tăng hiệu quả hoạt động của CSGD và quản lý rủi ro tốt hơn.",
      requirement: `Hệ thống quản trị của CSGD được cải tiến để tăng hiệu quả hoạt động của CSGD và quản lý rủi ro tốt hơn.  
      `,
      benchmark: `1.	Cơ cấu tổ chức, chức năng, nhiệm vụ của các đơn vị, bộ phận được điều chỉnh phù hợp với các quy định của CSGD và các quy định khác của đơn vị chủ quản để tăng hiệu quả hoạt động của CSGD và quản lý rủi ro tốt hơn. 
      2.	Nhân sự tham gia các đơn vị, bộ phận của hệ thống quản trị được điều chỉnh và/hoặc được nâng cao năng lực để tăng hiệu quả hoạt động của CSGD và quản lý rủi ro tốt hơn.
      3.	Hệ thống văn bản để tổ chức, quản lý của CSGD được điều chỉnh phù hợp với các thay đổi trong cơ cấu tổ chức và quản trị của CSGD.       
      `,
      evidence: `-	Các quyết định thành lập, điều chỉnh, các biên bản, báo cáo đánh giá về cơ cấu tổ chức nhân sự của CSGD; các quyết định bổ nhiệm/bãi nhiệm, điều chuyển, ... về nhân sự*.
      -	Các chương trình tập huấn, bồi dưỡng nhân sự của hệ thống quản trị*.
      -	Hệ thống văn bản quản lý của hệ thống quản trị trước và sau cải tiến*. 
      -	Các báo cáo về việc cải thiện hệ thống quản trị và giảm thiểu rủi ro.
      `,
    },
    {
      isParent: true,
      data: "Tiêu chuẩn 3. Lãnh đạo và quản lý"
    },
    {
      isParent: false,
      criteria: "TC 3.1. Lãnh đạo CSGD thiết lập cơ cấu quản lý trong đó phân định rõ vai trò, trách nhiệm, quá trình ra quyết định, chế độ thông tin, báo cáo để đạt được tầm nhìn, sứ mạng, văn hóa và các mục tiêu chiến lược của CSGD.",
      requirement: `Lãnh đạo CSGD thiết lập cơ cấu quản lý trong đó phân định rõ vai trò, trách nhiệm, quá trình ra quyết định, chế độ thông tin, báo cáo đểđạt được tầm nhìn, sứ mạng, văn hóa và các mục tiêu chiến lược của CSGD. 
      `,
      benchmark: `1.	Có cơ cấu quản lý rõ ràng. Các đơn vị/bộ phận/các tổ chức được thành lập mới căn cứ trên kế hoạch, định hướng chiến lược phát triển đã được phê duyệt và phù hợp với bối cảnh cụ thể của CSGD.
      2.	Có văn bản quy định rõ ràng vai trò, trách nhiệm, chức năng, nhiệm vụ và mối liên hệ giữa các thành phần trong cơ cấu quản lý.
      3.	Nhân sự tham gia cơ cấu quản lý được phân định rõ vai trò, trách nhiệm, thẩm quyền ra quyết định, chế độ thông tin, báo cáo.
      `,
      evidence: `-	Cơ cấu tổ chức quản lý của CSGD*.
      -	Văn bản quy định vai trò, trách nhiệm, chức năng, nhiệm vụ, mối quan hệ giữa các thành phần trong cơ cấu quản lý*. 
      -	Các bản mô tả công việc, đề án vị trí việc làm, các quyết định liên quan đến nhân sự tham gia cơ cấu quản lý*.
      -	Quy chế tổ chức và hoạt động của CSGD; hội đồng trường/hội đồng quản trị, ...
      -	Các quyết định bổ nhiệm lãnh đạo, quản lý.`,
    },
    {
      isParent: false,
      criteria: "TC 3.2. Lãnh đạo CSGD tham gia vào việc thông tin, kết nối các bên liên quan để định hướng tầm nhìn, sứ mạng, văn hóa và các mục tiêu chiến lược của CSGD.",
      requirement: `1. Lãnh đạo CSGD tham gia vào việc truyền tải các thông tin về tầm nhìn, sứ mạng, văn hóa và các mục tiêu chiến lược của CSGD.
      2. Lãnh đạo CSGD kết nối các bên liên quan để định hướng tầm nhìn, sứ mạng, văn hóa và các mục tiêu chiến lược của CSGD.      
      `,
      benchmark: `1. Lãnh đạo CSGD tham gia kết nối, tuyên truyền, định hướng tầm nhìn, sứ mạng, giá trị cốt lõi và các mục tiêu chiến lược của CSGD.
      2. Lãnh đạo CSGD tổ chức các hoạt động tuyên truyền về tầm nhìn, sứ mạng, giá trị cốt lõi và các mục tiêu chiến lược của CSGD đến các bên liên quan.      
      `,
      evidence: `-	Văn bản chỉ đạo việc tuyên truyền để định hướng về tầm nhìn, sứ mạng, giá trị cốt lõi và các mục tiêu chiến lược của CSGD*.
      -	Kế hoạch và các tài liệu liên quan đến các hoạt động tuyên truyền về tầm nhìn, sứ mạng, văn hóa và các mục tiêu chiến lược của CSGD đến các bên liên quan*.
      -	Các minh chứng thể hiện các bên liên quan có hiểu biết về tầm nhìn, sứ mạng của CSGD*.
      -	Thông tin về tầm nhìn, sứ mạng, văn hóa và các mục tiêu chiến lược của CSGD trên biển, bảng, trang thông tin điện tử, tờ rơi, ...
      -	Các video, hình ảnh, hội thảo, diễn đàn, ... về các hoạt động tuyên truyền có sự tham gia của lãnh đạo CSGD và các bên liên quan.          
      `,
    },
    {
      isParent: false,
      criteria: "TC 3.3. Cơ cấu lãnh đạo và quản lý của CSGD được rà soát thường xuyên.",
      requirement: `Cơ cấu lãnh đạo và quản lý của CSGD được rà soát thường xuyên.  
      `,
      benchmark: `1.	Cơ cấu quản lý được định kỳ rà soát.
      2.	Các văn bản quy định về vai trò, chức năng, nhiệm vụ và mối liên hệ giữa các thành phần trong cơ cấu quản lý được định kỳ rà soát.
      3.	Nhân sự tham gia vào cơ cấu lãnh đạo và quản lý được đánh giá định kỳ hằng năm.
      4.	Thực hiện quy hoạch đội ngũ lãnh đạo, quản lý của các đơn vị, bộ phận theo quy định.      
      `,
      evidence: `-	Báo cáo rà soát cơ cấu quản lý hằng năm*.
      -	Báo cáo rà soát các văn bản quy định về vai trò, chức năng, nhiệm vụ và mối liên hệ giữa các thành phần trong cơ cấu quản lý*.
      -	Biên bản đánh giá viên chức, công chức, đội ngũ cán bộ lãnh đạo, quản lý theo quy định của Luật Viên chức/Luật Công chức/Luật Lao động,…*.
      -	Các hồ sơ quy hoạch lãnh đạo, quản lý của CSGD*.
      -	Bản mô tả/Đề án vị trí việc làm của CSGD.
      -	Báo cáo tổng kết đánh giá hằng năm của Đảng ủy, hội đồng trường/hội đồng quản trị, Ban giám hiệu.        
      `,
    },
    {
      isParent: false,
      criteria: "TC 3.4. Cơ cấu lãnh đạo và quản lý của CSGD được cải tiến nhằm tăng hiệu quả quản lý và đạt được hiệu quả công việc của CSGD như mong muốn.",
      requirement: `Cơ cấu lãnh đạo và quản lý của CSGD được cải tiến nhằm tăng kết quả và hiệu quả quản lý.
      `,
      benchmark: `1.	1.	Cơ cấu LĐ&QL của CSGD được cải tiến dựa trên kết quả rà soát, đánh giá.
      2.	Các văn bản quy định về vai trò, chức năng, nhiệm vụ và mối liên hệ giữa các thành phần trong cơ cấu quản lý được điều chỉnh, bổ sung nhằm tăng hiệu quả quản lý và đạt được hiệu quả công việc của CSGD như mong muốn.
      3.	Nhân sự tham gia cơ cấu lãnh đạo và quản lý của CSGD được điều chỉnh, luân chuyển dựa trên kết quả đánh giá năng lực lãnh đạo, quản lý và hiệu quả công việc.           
      `,
      evidence: `-	Cơ cấu lãnh đạo và quản lý trước và sau cải tiến*.
      -	Các văn bản điều chỉnh, bổ sung quy định về vai trò, chức năng, nhiệm vụ và mối liên hệ giữa các thành phần trong cơ cấu quản lý*.
      -	Các quyết định bổ nhiệm, bổ nhiệm lại, quyết định luân chuyển cán bộ lãnh đạo quản lý*.
      -	Các hồ sơ quy hoạch lãnh đạo và quản lý của CSGD.       
      `,
    },
  ];

  eventBusSub?: Subscription;

  constructor(private tokenStorageService: TokenStorageService, private eventBusService: EventBusService, private dataService: DataService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = true;
      this.showModeratorBoard = false;

      this.username = user.username;
    }

    this.dataService.setCriteriaCSGD(this.data_CSGD);
    this.dataService.setCriteriaCTDT(this.data_CTDT);

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  ngOnDestroy(): void {
    if (this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }

  logout(): void {
    this.tokenStorageService.signOut();

    this.isLoggedIn = false;
    this.roles = [];
    this.showAdminBoard = false;
    this.showModeratorBoard = false;
  }
}
