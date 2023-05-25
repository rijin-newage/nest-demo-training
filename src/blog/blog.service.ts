import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Blog } from './blog.model';

const blogs = [
  {
    id: 1,
    title:
      'Ad et tempor proident velit dolore proident enim tempor elit occaecat dolor.',
    content:
      'Nisi aliqua enim consectetur non commodo ut voluptate. Ut incididunt nostrud nostrud fugiat nulla sunt sint consequat duis ut sit laboris in. Sint consectetur duis non in velit irure esse Lorem pariatur irure. Cillum consequat occaecat commodo pariatur veniam est exercitation aute ipsum Lorem ad.',
  },
  {
    id: 2,
    title: 'Aute culpa ex veniam enim proident dolor ipsum duis enim.',
    content:
      'Dolor deserunt ipsum mollit cupidatat excepteur cillum sunt nisi consequat Lorem nostrud proident cillum voluptate. Labore duis sit eiusmod ullamco qui ut velit cillum esse anim mollit. Amet laborum culpa enim culpa et aute dolor. Ex ex cillum in nisi consectetur ullamco veniam ut sunt eu commodo minim ex eiusmod. Sint do est nulla ut anim magna Lorem deserunt elit ipsum velit cillum.',
  },
  {
    id: 3,
    title:
      'Velit culpa amet commodo amet consequat nisi enim voluptate est nostrud labore ullamco irure mollit.',
    content:
      'Incididunt duis commodo officia nulla ex anim exercitation voluptate sunt nulla nulla qui. Aliquip magna tempor sunt officia cupidatat deserunt excepteur et ipsum laboris et dolore cillum ullamco. Irure excepteur consequat sit deserunt ex duis qui laboris enim elit ut.',
  },
];

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog)
    private blogModel: typeof Blog,
  ) {}

  getBlogs(search: string) {
    return blogs.filter((blog) => blog.title.includes(search));
  }

  getBlogDetails(id: number) {
    const blog = blogs.find((blog) => blog.id === id);
    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  create(body: any): Promise<Blog> {
    return this.blogModel.create(body);
  }

  getAll(): Promise<Blog[]> {
    return this.blogModel.findAll({
      include: ['person'],
    });
  }
}
